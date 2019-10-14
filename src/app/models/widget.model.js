"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let softDelete = require('mongoose-soft-delete');
const schema = new mongoose_1.Schema({
    current: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    deletedAt: {
        type: Date,
        required: false,
    }
}, {
    timestamps: true,
});
schema.plugin(softDelete, { index: true, select: true });
const Widget = mongoose_1.model('Widget', schema);
exports.Widget = Widget;
//# sourceMappingURL=widget.model.js.map