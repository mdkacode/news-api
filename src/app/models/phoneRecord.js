"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PhoneRegisterSchema = new mongoose_1.Schema({
    phoneCode: {
        type: String
    }
});
const PhoneWidget = mongoose_1.model('phoneRegister', PhoneRegisterSchema);
exports.PhoneWidget = PhoneWidget;
//# sourceMappingURL=phoneRecord.js.map