import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Calendar, Clock, User, Stethoscope, FileText, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/reception/book")({
  component: ReceptionBook,
});

function ReceptionBook() {
  const { user } = useAuth();
  
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [visitType, setVisitType] = useState("Consultation");
  const [success, setSuccess] = useState(false);

  // Fetch Patients for this hospital
  const { data: patients = [], isLoading: loadingPatients } = useQuery({
    queryKey: ['patients', user?.hospitalId],
    queryFn: async () => {
      if (!user?.hospitalId) return [];
      const res = await fetch(`http://localhost:3000/patient/hospital/${user.hospitalId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      return res.json();
    },
    enabled: !!user?.hospitalId
  });

  // Fetch all users to filter doctors
  const { data: allUsers = [], isLoading: loadingDoctors } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/user");
      return res.json();
    }
  });

  const doctors = allUsers.filter((u: any) => u.hospitalId === user?.hospitalId && u.role === 'DOCTOR');

  const bookMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("http://localhost:3000/appointment", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to book appointment");
      return res.json();
    },
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setPatientId("");
      setDoctorId("");
      setDate("");
    }
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.hospitalId || !patientId || !doctorId || !date || !time) return;

    // Calculate start and end time (30 min duration)
    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + 30 * 60000);

    bookMutation.mutate({
      hospitalId: user.hospitalId,
      patientId,
      doctorId,
      departmentId: null, // Will let backend allow null or default it
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      visitType,
      source: "RECEPTION"
    });
  };

  return (
    <AppShell>
      <PageHeader title="Book Appointment" subtitle="Schedule clinical visits for registered patients." />

      <div className="max-w-3xl mx-auto">
        <div className="card-soft p-6 md:p-8">
          <form onSubmit={handleBook} className="space-y-6">
            
            {success && (
              <div className="p-4 rounded-xl bg-success-highlight text-success flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-5 h-5"/>
                <div>
                  <div className="font-bold">Appointment Booked Successfully</div>
                  <div className="text-sm opacity-90">The visit has been scheduled and added to the doctor's calendar.</div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Patient Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2"><User className="w-4 h-4 text-primary"/> Select Patient</label>
                <select required value={patientId} onChange={e => setPatientId(e.target.value)} className="w-full p-3 rounded-xl bg-surface-offset border border-divider outline-none focus:border-primary transition-colors">
                  <option value="" disabled>-- Choose Patient --</option>
                  {patients.map((p: any) => (
                    <option key={p.id} value={p.id}>{p.firstName} {p.lastName} (MRN: {p.MRN})</option>
                  ))}
                </select>
                {loadingPatients && <div className="text-xs text-muted-foreground mt-1">Loading patients...</div>}
              </div>

              {/* Doctor Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2"><Stethoscope className="w-4 h-4 text-primary"/> Attending Doctor</label>
                <select required value={doctorId} onChange={e => setDoctorId(e.target.value)} className="w-full p-3 rounded-xl bg-surface-offset border border-divider outline-none focus:border-primary transition-colors">
                  <option value="" disabled>-- Choose Doctor --</option>
                  {doctors.map((d: any) => (
                    <option key={d.id} value={d.id}>Dr. {d.username.replace('dr.', '')}</option>
                  ))}
                </select>
                {loadingDoctors && <div className="text-xs text-muted-foreground mt-1">Loading doctors...</div>}
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-primary"/> Date</label>
                <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-3 rounded-xl bg-surface-offset border border-divider outline-none focus:border-primary transition-colors" />
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2"><Clock className="w-4 h-4 text-primary"/> Time</label>
                <input required type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-3 rounded-xl bg-surface-offset border border-divider outline-none focus:border-primary transition-colors" />
              </div>

              {/* Visit Type */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold flex items-center gap-2"><FileText className="w-4 h-4 text-primary"/> Visit Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Consultation', 'Follow-up', 'Routine Checkup'].map(type => (
                    <label key={type} className={`cursor-pointer flex items-center justify-center p-3 rounded-xl border text-sm font-medium transition-all ${visitType === type ? 'border-primary bg-primary-highlight text-primary' : 'border-divider bg-surface-offset hover:bg-surface-offset/80'}`}>
                      <input type="radio" name="visitType" value={type} checked={visitType === type} onChange={() => setVisitType(type)} className="hidden" />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" disabled={bookMutation.isPending} className="w-full mt-4 p-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary-hover active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-primary/20">
              {bookMutation.isPending ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
