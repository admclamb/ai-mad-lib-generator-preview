import { AxiosRequestConfig } from "axios";
import { AdlibModel } from "../models/AdlibModel";
import { ApiResponse } from "../models/ApiResponseModel";
import { PaginationResponse } from "../models/PaginationResponse";
import api from "./Api";
import { FeedTypes } from "../components/feed/FeedTypes";
import { CategoryModel } from "../models/CategoryModel";

const getCategories = (
  category: string,
  feedType: FeedTypes,
  timestamp: Date,
  page = 1,
  size = 5
): Promise<ApiResponse<PaginationResponse<CategoryModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib/category",
    params: {
      timestamp: timestamp.toISOString(),
      feedType,
      category,
      page,
      size,
    },
  };

  return api.callExternalApi<PaginationResponse<CategoryModel>>({ config });
};

const getAdlibsByCategory = (
  category: string,
  feedType: FeedTypes,
  timestamp: Date,
  page = 1,
  size = 5
): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib/category",
    params: {
      timestamp: timestamp.toISOString(),
      feedType,
      category,
      page,
      size,
    },
  };

  return api.callExternalApi<PaginationResponse<AdlibModel>>({ config });
};

const CategoryService = {
  getAdlibsByCategory,
  getCategories,
};

Object.freeze(CategoryService);
export default CategoryService;
