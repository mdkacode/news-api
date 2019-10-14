import { Schema, model } from 'mongoose';
const PhoneRegisterSchema = new Schema({

    phoneCode:{
        type:String
    }

})

const PhoneWidget = model('phoneRegister', PhoneRegisterSchema);
export { PhoneWidget };
