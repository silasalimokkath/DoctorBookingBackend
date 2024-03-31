import { Schema, model } from 'mongoose';

const prescriptionSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  medicines: [{ type: Schema.Types.ObjectId, ref: 'Medicine' }],
  message: String,
});
const Prescription = model('prescription', prescriptionSchema);

export default Prescription;
