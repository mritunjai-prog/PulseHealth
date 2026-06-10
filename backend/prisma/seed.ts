import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const fnames = ['Ananya', 'Rahul', 'Priya', 'Amit', 'Neha', 'Vikram', 'Pooja', 'Ravi', 'Kavita', 'Suresh', 'Anita', 'Rajesh', 'Sunita', 'Deepak', 'Geeta', 'Sanjay', 'Meena', 'Ajay', 'Rekha', 'Vijay'];
const lnames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Reddy', 'Rao', 'Das', 'Joshi', 'Chauhan', 'Thakur', 'Yadav', 'Nair', 'Menon', 'Pillai', 'Iyer', 'Chatterjee', 'Banerjee', 'Bose', 'Dutta'];

function randStr(arr: any[]) { return arr[Math.floor(Math.random() * arr.length)]; }

async function main() {
  console.log('Starting bulk seed...');

  let hospital = await prisma.hospital.findFirst();
  if (!hospital) {
    hospital = await prisma.hospital.create({
      data: { name: 'PulseHealth City Hospital', code: 'PHC-01', address: 'Main St', city: 'Bangalore', state: 'KA', country: 'IN' }
    });
  }

  let dept = await prisma.department.findFirst();
  if (!dept) {
    dept = await prisma.department.create({ data: { name: 'General Medicine', type: 'CLINICAL', hospitalId: hospital.id } });
  }

  let admin = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' } });
  if (!admin) {
    admin = await prisma.user.create({ data: { username: 'admin', passwordHash: await bcrypt.hash('123', 10), role: 'SUPER_ADMIN', hospitalId: hospital.id } });
  }

  console.log('Creating 10 Doctors...');
  const doctors: any[] = [];
  for(let i=0; i<10; i++) {
    doctors.push(await prisma.user.upsert({
      where: { username: 'dr.' + i },
      update: {},
      create: { 
        username: 'dr.' + i, 
        passwordHash: '123', 
        role: 'DOCTOR', 
        hospital: { connect: { id: hospital.id } },
        department: { connect: { id: dept.id } }
      }
    }));
  }

  console.log('Creating 50 Patients...');
  const patients: any[] = [];
  for(let i=0; i<50; i++) {
    patients.push(await prisma.patient.create({
      data: {
        hospital: { connect: { id: hospital.id } },
        MRN: 'MRN-' + Math.floor(Math.random() * 999999),
        firstName: randStr(fnames),
        lastName: randStr(lnames),
        dob: new Date(1950 + Math.random() * 50, Math.random() * 12, Math.random() * 28),
        gender: Math.random() > 0.5 ? 'MALE' : 'FEMALE',
        phone: '98' + Math.floor(Math.random() * 10000000),
        createdByUser: { connect: { id: admin.id } }
      }
    }));
  }

  console.log('Creating 100 Appointments for today...');
  for(let i=0; i<100; i++) {
    const today = new Date();
    today.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60), 0, 0);
    
    await prisma.appointments.create({
      data: {
        hospital: { connect: { id: hospital.id } },
        patient: { connect: { id: randStr(patients).id } },
        doctor: { connect: { id: randStr(doctors).id } },
        department: { connect: { id: dept.id } },
        startTime: today,
        endTime: new Date(today.getTime() + 1800000),
        status: Math.random() > 0.5 ? 'COMPLETED' : 'SCHEDULED',
        visitType: 'OPD',
        source: 'FRONTDESK'
      }
    });
  }

  console.log('Creating 50 Invoices for revenue...');
  for(let i=0; i<50; i++) {
    await prisma.invoice.create({
      data: {
        patient: { connect: { id: randStr(patients).id } },
        amount: 500 + Math.floor(Math.random() * 5000),
        status: Math.random() > 0.3 ? 'PAID' : 'PENDING',
        dueDate: new Date(new Date().getTime() + 86400000 * 30),
        items: [{ description: "General Consultation", price: 500 }]
      }
    });
  }

  console.log('Bulk seed successful! Dashboard will now show high KPIs.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
