import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  id_user: { type: String, required: true },
  delivery: {
    client_name: { type: String, required: true },
    delivery_date: { type: String, required: true },
    point_start: { type: String, required: true },
    point_end: { type: String, required: true },
  },

});

const DeliveryModel = mongoose.model('DELIVERY', DeliverySchema);

export default DeliveryModel;
