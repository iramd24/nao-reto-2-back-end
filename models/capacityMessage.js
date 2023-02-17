import mongoose from 'mongoose';

const capacitySchema = mongoose.Schema({
    rownum: { type: Number, default: 1 },
    capacities: [{
        branch: String,
        month_description_effective_from: String,
        business_unit: String,
        effective_from: Number,
        /*{
            type: Date,
            default: new Date()//"<mm-dd-YY>"
        },*/
        week_number_effective_from: Number,
        planned_released: Number,
        firmwo: Number,
        plannedwo: Number,
        daily_capacity: Number,
        weekly_capacity: Number,
        mothly_capacty: Number,
        request_date:  Number,
        /*{
            type: Date,
            default: new Date()
        },*/
        rate_hour: Number,
        primary_uom_hour: Number,
        short_item_number: Number,
        second_item_number_litm: String,
        work_order_quantity: Number,
        quantity_ordered_: Number,
        work_order_number: Number,
        wo_status: String,
        type_of_routing: String,
        wo_start_date: Number
        /*{
            type: Date,
            default: new Date()
        }*/
    }]
});

const capacityMessage = mongoose.model('capacityMessage', capacitySchema);

export default capacityMessage;