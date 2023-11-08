import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    callCount: Number
});

schema.methods.gibCallCount = function gibCallCount() {
    return `Dies ist der ${this.callCount} aufruf.`;
}

const demo_model = mongoose.model('demoModel', schema);

export default demo_model;