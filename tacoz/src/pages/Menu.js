import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu, selectFilteredMenu } from "../redux/menuSlice";
import useIsMobile from "./useIsMobile";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";

const Menu = () => {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.menu.status);
  const search = useSelector((s) => s.menu.search);
  const filters = useSelector((s) => s.menu.filters);
  const filteredMenu = useSelector(selectFilteredMenu);
  const isMobile = useIsMobile();

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.append("q", search);
    if (filters.minDelivery) params.append("minDelivery", filters.minDelivery);
    if (filters.maxDelivery) params.append("maxDelivery", filters.maxDelivery);
    if (filters.minRating) params.append("minRating", filters.minRating);
    if (filters.platform) params.append("platform", filters.platform);
    if (filters.category) params.append("category", filters.category);
    dispatch(fetchMenu(params.toString() ? `?${params.toString()}` : ""));
  }, [dispatch, search, filters]);

  return isMobile ? (
    <MenuMobile items={filteredMenu} status={status} />
  ) : (
    <MenuDesktop items={filteredMenu} status={status} />
  );
};

export default Menu;
