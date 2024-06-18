
const adminRoutes={

    getUserDetails:'/admin/users',
    blockUser:'/admin/blockUser',
    unBlockUser:'/admin/unBlockUser',
    getRequests:'/admin/getRequests',
    approveRequest:'/admin/approveRequest',
    rejectRequest:'/admin/rejectRequest',
    getFranchises:'/admin/getFranchises',
    blockFranchise:'/admin/blockFranchise',
    unBlockFranchise:'/admin/unBlockFranchise',
    addService:'/admin/addService',
    getServices:'/admin/getServices',
    deleteService:'/admin/deleteService',
    editService:'/admin/editService',
    addCoupon:'/admin/addCoupon',
    deleteCoupon:'/admin/deleteCoupon',
    editCoupon:'/admin/editCoupon',
    getCoupons:'/admin/getCoupons', 
    weeklyReport:"/admin/weeklyReport",
    monthlyReport:"/admin/monthlyReport",
    yearlyReport :"/admin/yearlyReport",
    getStats:"/admin/getStats",
    franchiseweeklyReport:"/admin/franchiseweeklyReport",
    franchisemonthlyReport:"/admin/franchisemonthlyReport",
    franchiseyearlyReport :"/admin/franchiseyearlyReport",
    franchiseStats:"/admin/franchiseStats"
}

export default adminRoutes