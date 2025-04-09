// const otpGenerator = require("otp-generator")
// const { errorHandler } = require("../helpers/error_handler")
// const { otp } = require("../models/otp.models")

// const createOtp = async (req, res) => {
//     try {
//         const {phone_number } = req.body
//         const otp = otpGenerator.generate(4, {
//             digits: true,
//             upperCaseAlphabets: false,
//             lowerCaseAlphabets: false,
//             specialChars: false
//         })

//         res.status(201).send({otp})

//     } catch (error) {
//         errorHandler(error, res)
//     }
// }

// module.exports = createOtp

const otpGenerator = require("otp-generator");
const { errorHandler } = require("../helpers/error_handler");
const { addMinutesToDate } = require("../helpers/add_minutes");
const { otp } = require("../models");
const { v4: uuidv4 } = require("uuid");
const smsService = require("../services/sms.service");
const mailService = require("../services/mail.service");
const config = require("config"); // config/default.json dan o'qiladi
const { encode } = require("../utils/encode");

const createOtp = async (req, res) => {
  try {
    const { phone_number, email } = req.body;

    const code = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const now = new Date();
    const expirationTime = addMinutesToDate(
        now,
        config.get("expiration_minute")
    );

    const newOtp = await otp.create({
      id: uuidv4(),
      phone_number,
      email,
      code,
      expires_at: expirationTime,
    });

    // OTP yuborish
    const response = await smsService.sendSms(phone_number, code);// code or otp
    if (response.status !== 200) {
      return res.status(503).send({ message: "OTP yuborishda xatolik" });
    }

    // emailga yuborish
    await mailService.sendActivationMail(email, code);

    // Ma'lumotni JSON ko‘rinishida kodlash
    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtp.id,
    };
    const encodedData = await encode(JSON.stringify(details));

    // Javob qaytarish
    res.status(201).send({
      message: `Code has been sent to user ${phone_number.slice(-4)}`,
      a: encodedData,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = createOtp;
