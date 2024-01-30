


const walletTransactionSchema = new mongoose.Schema({
    consultantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'consultant', // Name of the consultant schema
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student', // Name of the student schema
    },
    type: {
      type: String,
      enum: ['recharge', 'deduction', 'earning'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  