import React from "react";
import { TiThLargeOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { PiShoppingCart } from "react-icons/pi";
import { GoGraph } from "react-icons/go";
import { BsBox2 } from "react-icons/bs";
import configureAPI from "../../Config/configureAPI";
import LogoutButton from "../General/logoutButton";
import { useEffect } from "react";
import fetchApi from "../../Config/fetchApi";
import { useState } from "react";
import { AiOutlineBranches } from "react-icons/ai";

const SideBar = ({ menuTab }) => {
  const navigate = useNavigate();
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const ownerId = sessionStorage.getItem("owner_id");
  const branchId = sessionStorage.getItem("branch_id");
  const [branches, setBranches] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetchApi(`${URL}/branches/owner/${ownerId}`);
      if (!response.ok) throw new Error("Failed to fetch branches");
      const data = await response.json();
      setBranches(data);

      const matchedBranch = data.find(
        (branch) => branch.branch_id === branchId
      );
      setSelectedBranch(matchedBranch || null);
    } catch (error) {
      console.error("Error fetching branches:", error);
      setError("ไม่สามารถดึงข้อมูลสาขาได้");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = async () => {
    if (!isOpen && branches.length === 0) {
      await fetchBranches();
    }
    setIsOpen(!isOpen);
  };

  const handleDashBoard = () => {
    navigate("/overview");
  };
  const handleOrderSummary = () => {
    navigate("/order-summary");
  };
  const handleSaleSummaryGraph = () => {
    navigate("/sale-summary-graph");
  };
  const handleStock = () => {
    navigate("/stock");
  };

  const handleBranchSelect = async (branch) => {
    if (branch.branch_id === branchId) {
      setIsOpen(false);
      return; // No need to switch if it's the same branch
    }

    try {
      setIsLoading(true);
      // Store the branch data before changing branch
      const currentPath = window.location.pathname;

      // Save branch_id to session storage
      sessionStorage.setItem("branch_id", branch.branch_id);

      // Update selected branch without page reload
      setSelectedBranch(branch);
      setIsOpen(false);

      // Prefetch essential data for the new branch
      try {
        // You could prefetch essential data here based on the new branch
        // Example: await fetchApi(`${URL}/some-essential-data/${branch.branch_id}`);
      } catch (prefetchError) {
        console.error("Error prefetching data for new branch:", prefetchError);
      }

      // Refresh the current page (this is smoother than full reload)
      navigate(currentPath, { replace: true });

      // Force refetch of data after navigation
      setTimeout(() => {
        window.location.reload(false); // Use false for a smoother reload from cache when possible
      }, 100);
    } catch (error) {
      console.error("Error switching branch:", error);
      setError("ไม่สามารถเปลี่ยนสาขาได้");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <nav className="border-b border-[#2C586E] mb-4 dark:bg-[#2C586E] shadow-md w-full">
        <div className="flex items-center justify-between mx-auto p-4 bg-[#2C586E]">
          {/* Shop logo */}
          <a className="flex items-center space-y-2 ml-8">
            <svg
              width="60"
              height="48"
              viewBox="0 0 60 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex items-center"
            >
              <path
                d="M46 1.5C46 7.46737 44 13.5 41 17.4099C37 21.5 37 24 25.5222 24C14.0444 24 14 22.1151 9.61232 17.4099C5.22463 12.7047 5 7.96737 5 2H9C9 10.5 12.4388 14.5834 12.4388 14.5834C12.4388 14.5834 15.5222 20.0027 25.5222 20.0027C35.5222 20.0027 38 14.5834 38 14.5834C38 14.5834 41.4321 8.5 41.4321 1.5H46Z"
                fill="#2F2105"
              />
              <path
                d="M41.4596 9.5273C41.8656 10.8568 42.6895 12.02 43.8091 12.8441C44.9286 13.6682 46.2841 14.1094 47.6742 14.102C49.0643 14.0946 50.415 13.6391 51.5258 12.8032C52.6365 11.9673 53.4481 10.7954 53.84 9.46164C54.2319 8.12786 54.1832 6.70326 53.7012 5.39934C53.2192 4.09542 52.3296 2.98169 51.1643 2.2235C49.9991 1.46532 48.6205 1.1031 47.2331 1.19061C45.8457 1.27813 44.5235 1.81072 43.4628 2.70932L45.6146 5.24923C46.1289 4.81352 46.77 4.55529 47.4427 4.51285C48.1154 4.47042 48.7838 4.64605 49.3488 5.01367C49.9138 5.38129 50.3452 5.9213 50.5789 6.55354C50.8126 7.18577 50.8362 7.87651 50.6462 8.52322C50.4561 9.16993 50.0626 9.73813 49.5241 10.1434C48.9855 10.5488 48.3306 10.7696 47.6566 10.7732C46.9825 10.7768 46.3253 10.5629 45.7825 10.1633C45.2396 9.7637 44.8401 9.19972 44.6433 8.55506L41.4596 9.5273Z"
                fill="#2F2105"
              />
              <path
                d="M39 1.59495C39 5.94584 37.525 10.1185 34.8995 13.1951C32.274 16.2716 28.713 18 25 18C21.287 18 17.726 16.2716 15.1005 13.1951C12.475 10.1185 11 5.94584 11 1.59495C11 1.59495 19 5.18358 25 1.59495C31 -1.99369 39 1.59495 39 1.59495Z"
                fill="#F4AE26"
              />
              <rect
                x="6"
                y="27"
                width="47"
                height="3"
                rx="1.5"
                fill="#2F2105"
              />
            </svg>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              {selectedBranch ? (
                <p>
                  {selectedBranch.branch_name} {selectedBranch.branch_address}
                </p>
              ) : (
                <p></p>
              )}
            </span>
          </a>

          {/* menu list */}
          <div className="flex items-center space-x-6 w-auto mr-8">
            {/* Branch */}
            <div className="relative">
              <button
                className="flex p-2 text-white hover:text-[#C68A47]"
                onClick={toggleDropdown}
                disabled={isLoading}
              >
                <AiOutlineBranches size={24} />
                <span className="text-xl font-bold">สาขา</span>
                {isLoading && (
                  <span className="ml-1 inline-block animate-spin">⟳</span>
                )}
              </button>
              {isOpen && (
                <div className="absolute left-0 mt-2 z-10 bg-white rounded-lg shadow-sm w-44">
                  {error ? (
                    <div className="px-4 py-2 text-red-500">{error}</div>
                  ) : isLoading ? (
                    <div className="px-4 py-2 text-gray-500">กำลังโหลด...</div>
                  ) : (
                    <ul className="py-2 text-black">
                      {branches.length > 0 ? (
                        branches.map((branch) => (
                          <li key={branch.branch_id}>
                            <button
                              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                branch.branch_id === branchId
                                  ? "bg-gray-100 font-bold"
                                  : ""
                              }`}
                              onClick={() => handleBranchSelect(branch)}
                            >
                              {branch.branch_name} {branch.branch_address}
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">
                          ไม่มีข้อมูลสาขา
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* dashboard */}
            <button
              onClick={handleDashBoard}
              className="flex p-2 text-white hover:text-[#C68A47] transition-all duration-300"
              disabled={isLoading}
            >
              <div
                className={`flex items-center p-2 rounded-lg ${
                  menuTab === "overview" ? "text-[#C68A47]" : "text-white"
                }`}
              >
                <TiThLargeOutline
                  size={24}
                  className={`${
                    menuTab === "overview" ? "text-[#C68A47]" : "text-white"
                  }`}
                />
                <span className="text-xl font-bold ml-1">ภาพรวมการขาย</span>
              </div>
            </button>

            {/* order */}
            <button
              onClick={handleOrderSummary}
              className="flex p-2 hover:text-[#C68A47] transition-all duration-300"
              disabled={isLoading}
            >
              <div
                className={`flex items-center p-2 rounded-lg ${
                  menuTab === "orderSummary" ? "text-[#C68A47]" : "text-white"
                }`}
              >
                <PiShoppingCart
                  size={24}
                  className={`${
                    menuTab === "orderSummary" ? "text-[#C68A47]" : "text-white"
                  }`}
                />
                <span className="text-xl font-bold ml-1">ประวัติออเดอร์</span>
              </div>
            </button>

            {/* sale summary */}
            <button
              onClick={handleSaleSummaryGraph}
              className="flex p-2 text-white hover:text-[#C68A47] transition-all duration-300"
              disabled={isLoading}
            >
              <div
                className={`flex items-center p-2 rounded-lg ${
                  menuTab === "saleSummaryGraph"
                    ? "text-[#C68A47]"
                    : "text-white"
                }`}
              >
                <GoGraph
                  size={24}
                  className={`${
                    menuTab === "saleSummaryGraph"
                      ? "text-[#C68A47]"
                      : "text-white"
                  }`}
                />
                <span className="text-xl font-bold ml-1">สรุปรายเดือน</span>
              </div>
            </button>

            {/* stock */}
            <button
              onClick={handleStock}
              className="flex p-2 text-white hover:text-[#C68A47] transition-all duration-300"
              disabled={isLoading}
            >
              <div
                className={`flex items-center p-2 rounded-lg ${
                  menuTab === "stock" ? "text-[#C68A47]" : "text-white"
                }`}
              >
                <BsBox2
                  size={24}
                  className={`${
                    menuTab === "stock" ? "text-[#C68A47]" : "text-white"
                  }`}
                />
                <span className="text-xl font-bold ml-1">คลังสินค้า</span>
              </div>
            </button>

            {/* log out */}
            <button className="flex p-2 text-black hover:text-red-600 transition-all duration-300">
              <LogoutButton />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
