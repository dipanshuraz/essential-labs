"use client";

import { useCustomerAuth } from "@/lib/customer-auth/CustomerAuthProvider";

export function CustomerProfileDetails() {
  const { user } = useCustomerAuth();
  if (!user) return null;

  return (
    <div className="personal-info">
      <h3>Personal Information</h3>
      <p>
        Manage your personal information, including phone numbers and email address where you can be
        contacted
      </p>
      <div className="row clearfix">
        <div className="col-xl-3 col-lg-6 col-md-12 single-column">
          <div className="single-item">
            <h6>Name</h6>
            <span>
              {user.firstName} {user.lastName}
            </span>
            <button type="button">Edit</button>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-12 single-column">
          <div className="single-item">
            <h6>Date of Birth</h6>
            <span>—</span>
            <button type="button">Edit</button>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-12 single-column">
          <div className="single-item">
            <h6>Address</h6>
            <span>—</span>
            <button type="button">Edit</button>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-12 single-column">
          <div className="single-item">
            <h6>Email</h6>
            <span>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </span>
            <button type="button">Edit</button>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-12 single-column">
          <div className="single-item">
            <h6>Mobile</h6>
            <span>{user.phone || "—"}</span>
            <button type="button">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
