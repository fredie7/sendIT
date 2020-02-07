const parcelValidation = {
  createParcelValidation: (req, res, next) => {
    req.check('pickupLocation', 'enter your pickup location').notEmpty();
    req.check('presentLocation', 'enter your present location').notEmpty();
    req.check('presentLocation').isLength({ min: 2, max: 20 }).withMessage('content should be betweek 2 - 20 characters');
    req.check('receiverPhone', 'enter receiver\'s phone number').notEmpty();
    req.check('receiverEmail', 'enter receiver\'s email').notEmpty();
    req.check('description', 'a brief description of parcel is required').notEmpty();
    req.check('description').isLength({ min: 20, max: 200 }).withMessage('content description should be between 20 - 200 characters');
    req.check('weight', 'fill in appropriate weight measure').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      const firstError = errors.map(err => err.msg)[0];
      return res.status(422).json({ error: firstError });
    }
    next();
  },
};

export default parcelValidation;
