import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndPoints";
import errorHandle from "./error";

interface Service {
  category: string;
  services: string[];
  price: {
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  };
}

interface updateService {
  _id: string;
  category: string;
  services: string[];
  price: {
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  };
}

export const getUsers = async () => {
  try {
    const response = await Api.get(adminRoutes.getUserDetails);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const blockUser = async (userId: { userId: string }) => {
  try {
    const response = await Api.post(adminRoutes.blockUser, userId);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const unBlockUser = async (userId: { userId: string }) => {
  try {
    const response = await Api.post(adminRoutes.unBlockUser, userId);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getRequests = async () => {
  try {
    const response = await Api.get(adminRoutes.getRequests);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const approveRequest = async (reqId: { reqId: string }) => {
  try {
    const response = await Api.post(adminRoutes.approveRequest, reqId);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const rejectRequest = async ({
  reqId,
  reason,
}: {
  reqId: string;
  reason: string;
}) => {
  try {
    const response = await Api.post(adminRoutes.rejectRequest, {
      reqId,
      reason,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getFranchises = async () => {
  try {
    const response = await Api.get(adminRoutes.getFranchises);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const blockFranchise = async (franchiseId: { franchiseId: string }) => {
  try {
    const response = await Api.post(adminRoutes.blockFranchise, franchiseId);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const unBlockFranchise = async (franchiseId: {
  franchiseId: string;
}) => {
  try {
    const response = await Api.post(adminRoutes.unBlockFranchise, franchiseId);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const addServices = async (service: { service: Service }) => {
  try {
    const response = await Api.post(adminRoutes.addService, service);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const deleteService = async (serviceId: { serviceId: string }) => {
  try {
    const response = await Api.post(adminRoutes.deleteService, serviceId);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const updateService = async (updatedService: {
  updatedService: updateService;
}) => {
  try {
    const response = await Api.post(adminRoutes.editService, updatedService);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getServices = async () => {
  try {
    const response = await Api.get(adminRoutes.getServices);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const addCoupon = async (coupon: {
  code: string;
  discount: string;
  validFrom: string;
  validTo: string;
  minCartValue: string;
}) => {
  try {
    const response = await Api.post(adminRoutes.addCoupon, { coupon: coupon });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getCoupons = async () => {
  try {
    const response = await Api.get(adminRoutes.getCoupons);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const editCoupon = async (
  Id: string,
  data: {
    code: string;
    discount: string;
    validFrom: string;
    validTo: string;
    minCartValue: string;
  }
) => {
  try {
    const response = await Api.post(adminRoutes.editCoupon, {
      Id: Id,
      data: data,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const removeCoupon = async (Id: string) => {
  try {
    const response = await Api.post(adminRoutes.deleteCoupon, { Id: Id });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
