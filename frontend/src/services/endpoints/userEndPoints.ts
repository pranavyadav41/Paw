
const userRoutes={
    

    signup:'/user/sign_up',
    userOtpVerify:'/user/verify',
    userOtpResend:'user/resend_otp',
    userLogin:'user/login',
    userForgotPass:'/user/verifyEmail',
    userResetPassword:'/user/resetPassword',
    resendOtp:'/user/resendOtp', 
    getService:'/user/service',
    getProfile:'/user/getProfile',
    updateProfile:'/user/editProfile',
    addAddress:'/user/addAddress',
    getAddress:'/user/getAddress',
    deleteAddress:'/user/deleteAddress',
    editAddress:'/user/editAddress',
    changePassword:'/user/changePassword',
    bookService:'/user/generateSlots',
    confirmBooking:'/user/bookService',
    getCoupons:'/user/getAllCoupons',
    applyCoupon:'/user/applyCoupon',
    getBookings:'/user/getBookings',
    fetchBooking:'/user/getBooking',
    getFranchise:'/user/getFranchise',
    checkDate:'/user/checkDate',
    confirmCancel:'/user/confirmCancel',
    getWallet:'/user/getWallet',
    submitFeedback:'/user/submitFeedback',
    getFeedbacks:'/user/getFeedbacks',
    checkFeedback:'/user/checkFeedback',
    homePageData:'/user/homePageData',
    logout:'/user/logout',
}

export default userRoutes 