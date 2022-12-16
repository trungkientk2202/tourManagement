const { findUser, saveUser } = require('../../config/db/models/user.model')
const { makeSuccessResponse } = require('../../utils/Response');
const { validateEmail } = require('../../utils/Validate');
const { LOGIN_TYPE, TOKENS } = require('../../utils/Constants');
const userMongo = require('../../config/db/models/user.mongo');
const tokenMongo = require('../../config/db/models/tokens.mongo')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const transporter = nodemailer.createTransport({ 
    service: 'Gmail',
    auth: 
        { 
            user: 'olivertuan1310@gmail.com', 
            pass: 'pykwzozcafkwbfhz' 
        } 
    });


const test = (req, res) => {
    console.log(req.user);
    res.send('hello world');
};

const register = async(req, res) => {
    try{
        if(!req.body.email || !req.body.password || !req.body.confirmpassword)
            return makeSuccessResponse(res, 400, {
                message: 'Missing required information'
            });
        const reqEmail = req.body.email.trim();
        const reqPassword = req.body.password.trim();
        const reqPasswordConfirm = req.body.confirmpassword.trim();
        
        if(reqPassword.length < 3)
            return makeSuccessResponse(res, 400, {
                message: 'Password length must be greater than 3'
            });

        if(reqPassword !== reqPasswordConfirm)
            return makeSuccessResponse(res, 400, {
                message: 'Password not match'
            });
            

        if(!validateEmail(reqEmail))
            return makeSuccessResponse(res, 500, {
                message: 'Invalid email'
            });
        
        const getUser = await findUser({
            email: reqEmail
        })

        if(getUser instanceof userMongo && getUser)
        {
             // if user exist in db
             return makeSuccessResponse(res, 400, {
                message: 'This email address is already existed'
            });
        }
        else{
            const newUser = await saveUser({
                email: reqEmail,
                password: reqPassword,
                status: false,
                type: LOGIN_TYPE.NORMAL
            });

            if(newUser)
            {
                const token = new tokenMongo({
                    _userId: newUser._id,
                    token: crypto.randomBytes(16).toString('hex'),
                    type: TOKENS.EMAIL_VERIFY
                });
                const newToken = await token.save();
                
                if(newToken instanceof tokenMongo && newToken)
                {
                    // send mail
                    const mailOptions = { 
                        from: 'no-reply@example.com', 
                        to: newUser.email, 
                        subject: 'Account Verification Link', 
                        text: 'Hello '+ newUser.email +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/' + 'user'+ '\/confirmation\/' + newUser.email + '\/' + newToken.token + '\n\nThank You!\n' };
                    
                    transporter.sendMail(mailOptions, err => {
                        if (err) { 
                            console.log(err);
                            return makeSuccessResponse(res, 500, {
                                message: 'Technical Issue!, Please click on resend for verify your Email.'
                            });
                        }
                        
                        return makeSuccessResponse(res, 400, {
                            message: 'A verification email has been sent to ' + newUser.email + '. It will be expire after 1 minute. If you not get verification Email click on resend.'
                        })
                    });
                }
                else throw new Error('Something went wrong'); 
            }
            else throw new Error('Something went wrong');
        }
    }catch(error)
    {
        console.log(error);
        return makeSuccessResponse(res, 500, {
            message: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password)
            return makeSuccessResponse(res, 400, {
                message: 'Missing required information'
            });
        const reqEmail = req.body.email.trim();
        const reqPasword = req.body.password.trim();
        
        const getUser = await userMongo.findOne({ email: reqEmail });
        if (!getUser)
        {
            // if email not found in db
            return makeSuccessResponse(res, 401, {
                message: 'The email address ' + reqEmail + ' is not associated with any account. please check and try again!'
            });
        }
        else if (!bcrypt.compareSync(reqPasword, getUser.password))
        {
            return makeSuccessResponse(res, 401, {
                message: 'Wrong password'
            });
        }
        else if (!getUser.status)
        {
            // if email not verified 
            return makeSuccessResponse(res, 401, {
                message: 'Your Email has not been verified. Please click on resend'
            });
        }
        else {
            
        }

    }catch(error)
    {
        return makeSuccessResponse(res, 500, {
            message: error.message,
        });
    }
}

const verifyAccount = async(req, res) => {
    try
    {
        if (!req.params.email || !req.params.token)
        {
            return makeSuccessResponse(res, 400, {
                message: 'Missing required information'
            });
        }

        const getToken = await tokenMongo.findOne({
            token: req.params.token,
            type: TOKENS.EMAIL_VERIFY
        });
        
        if(getToken)
        {
            const getUser = await userMongo.findOne({ 
                _id: getToken._userId, 
                email: req.params.email 
            });
            if (getUser instanceof userMongo && getUser)
            {
                if(getUser.status)
                {
                    return makeSuccessResponse(res, 200, {
                        message: 'User has been already verified. Please Login'
                    })
                }
                else {
                    const updateUser = await userMongo.updateOne({
                        email: req.params.email
                    }, {
                        status: true
                    });

                    if(updateUser.modifiedCount == 1)
                    {
                        await tokenMongo.deleteOne({ _userId: getUser._id });
                        return makeSuccessResponse(res, 200, {
                            message: 'Your account has been successfully verified'
                        });
                    }
                }
            }
            else {
                return makeSuccessResponse(res, 401, {
                    message: 'We were unable to find a user for this verification. Please SignUp!'
                })
            }
        }
        else{
            return makeSuccessResponse(res, 400, {
                message: 'Your verification link may have expired. Please click on resend for verify your Email.'
            })
        }

    }catch(error){
        console.log(error);
        return makeSuccessResponse(res, 500, {
            message: error.message
        })
    }
}

const resendLink = async(req, res) => {
    try{
        if (!req.body.email)
            return makeSuccessResponse(res, 400, {
                message: 'Missing required information'
            });

        const reqEmail = req.body.email.trim();
        const getUser = await userMongo.findOne({email: reqEmail});

        if (!validateEmail(reqEmail))
            return makeSuccessResponse(res, 500, {
                message: 'Invalid email'
            });
            
        if (getUser instanceof userMongo && getUser)
        {
            if (getUser.status)
                return makeSuccessResponse(res, 200, {
                    message: 'This account has been already verified. Please log in.'
                })
            else {
                // delete the old ones
                await tokenMongo.deleteMany({ 
                    _userId: getUser._id,
                    type: TOKENS.EMAIL_VERIFY
                 });
                
                // generate token and save
                const token = new tokenMongo({ 
                    _userId: getUser._id, 
                    token: crypto.randomBytes(16).toString('hex'),
                    type: TOKENS.EMAIL_VERIFY
                });

                const newToken = await token.save();
    
                // send mail
                if (newToken instanceof tokenMongo && newToken)
                {
                    const mailOptions = { 
                        from: 'no-reply@example.com', 
                        to: getUser.email, 
                        subject: 'Account Verification Link', 
                        text: 'Hello '+ getUser.userName +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/' + 'user'+ '\/confirmation\/' + getUser.email + '\/' + newToken.token + '\n\nThank You!\n' };
                    
                    transporter.sendMail(mailOptions, err => {
                        if (err) { 
                            return makeSuccessResponse(res, 500, {
                                message: 'Technical Issue!, Please click on resend for verify your Email.'
                            });
                        }
                        
                        return makeSuccessResponse(res, 400, {
                            message: 'A verification email has been sent to ' + getUser.email + '. It will be expire after 1 minutes. If you not get verification Email click on resend token.'
                        })
                    });
                }
                else throw new Error('Something went wrong');
            }
        }
        else{
            return makeSuccessResponse(res, 500, {
                message: 'We were unable to find a user with that email. Make sure your Email is correct!'
            })
        }

    }catch(error)
    {
        console.log(error);
        return makeSuccessResponse(res, 500, {
            message: error.message
        })
    }
}

const getCurrentUser = async (req, res) => {
    const reqUser = req?.user;
    if (reqUser) {
        console.log(reqUser);
        const getUser = await findUser({id: reqUser});
        if (getUser) {
            return makeSuccessResponse(res, 200, {
                data: getUser,
            });
        }
        return makeSuccessResponse(res, 404, {
            error: "User not found!",
        });
    }
    else{
        return makeSuccessResponse(res, 404, {
            message: 'Missing user!',
        });
    }
};

const logoutUser = (req, res) => {
    req.logOut();
    return makeSuccessResponse(res, 200, {
        message: "Logout"
    });
};

const googleLoginFailed = (req, res) => {
    return makeSuccessResponse(res, 401, {
        message: "Login google failed"
    });
}
// fetch('https://localhost:8000/api/user/auth/google/login/success', {method: "GET", headers: {"Content-Type": "application/json" }, credentials: "same-origin" }).then(res => console.log(res))
// fetch("http://localhost:8000/api/user/auth/google/login/success", {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Credentials": true,
//         },
//       })

const googleLoginSuccess = async(req, res) => {
    console.log(req.user);
    const user = await findUser({googleId: req.user});
    if(req.user && user) {

        console.log(user);
        return makeSuccessResponse(res, 200, {
            data: user,
            // cookies: req.cookies
        })
    }
    return makeSuccessResponse(res, 404, {
        message: "User not found"
    })
}

const getUser = async (req, res) => {

};

module.exports = {
    test,
    getCurrentUser,
    getUser,
    logoutUser,
    googleLoginFailed,
    googleLoginSuccess,
    register,
    login,
    verifyAccount,
    resendLink
}