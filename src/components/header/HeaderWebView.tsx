import { memo } from "react";
import { Grid, Dropdown } from "semantic-ui-react";

import "./Header.scss";
import { LOGO } from "../../config/constants";
import { CustomButton } from "../button/Button";
import { handleDashBoard } from "../../utils/utils";

export const HeaderWebView = memo(
  ({
    options,
    userImage,
    navigate,
    token,
    isSupplierRegister,
    supplierData,
    userRole,
    userDetails,
  }: any) => {
    return (
      <div className="mainContent">
        <Grid verticalAlign="middle" className="headerDefaultView" centered>
          <Grid.Column computer={3} className="rightContent" only="computer">
            <div
              onClick={() => handleDashBoard(userRole, userDetails, navigate)}
            >
              <img src={LOGO} alt="logo" className="logo" />
            </div>
          </Grid.Column>
          <Grid.Column computer={13} only="computer" className="mainCenterView">
            <div className="headerRightView">
              {!token ? (
                <>
                  <CustomButton
                    theme="green"
                    title="Sign in"
                    onClick={() => navigate("/auth")}
                  />
                  <CustomButton
                    title="Sign up"
                    onClick={() => navigate("/register")}
                  />
                </>
              ) : (
                <>
                  {userRole === "user" ? (
                    <CustomButton
                      theme="green"
                      title={"My Planning Tool"}
                      onClick={() => {
                        navigate(`/user-dashboard/${userDetails._id}`);
                      }}
                      customButtonStyle="headerSupplierButton"
                      customColumnStyle="headerSupplierButton"
                    />
                  ) : null}

                  {!isSupplierRegister ? (
                    <CustomButton
                      theme="green"
                      title={!isSupplierRegister ? "Suppliers" : "Setting"}
                      onClick={() =>
                        !isSupplierRegister
                          ? navigate("/supplier/categoryList")
                          : navigate(
                              `/supplier/supplier-data/${supplierData._id}?category=${supplierData.categoryType}`
                            )
                      }
                      customButtonStyle="headerSupplierButton"
                      customColumnStyle="headerSupplierButton"
                    />
                  ) : null}
                  <Dropdown
                    trigger={userImage}
                    options={options}
                    pointing="top left"
                    icon={null}
                  />
                </>
              )}
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
);
