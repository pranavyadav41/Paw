import { rejectRequest } from "../../api/admin"

const adminRoutes={

    getUserDetails:'/admin/users',
    blockUser:'/admin/blockUser',
    unBlockUser:'/admin/unBlockUser',
    getRequests:'/admin/getRequests',
    approveRequest:'/admin/approveRequest',
    rejectRequest:'/admin/rejectRequest',
    getFranchises:'/admin/getFranchises'
}

export default adminRoutes