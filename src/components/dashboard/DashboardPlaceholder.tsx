import React from "react";

function DashboardPlaceholder() {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 placeholder-glow">
        <div className="placeholder col-3"></div>
        <div className="placeholder col-2"></div>
      </div>

      <div className="row">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-lg-4 col-md-6 mb-4">
            <div className="card border shadow-sm h-100 placeholder-glow">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded me-3"></div>
                    <span className="placeholder col-8"></span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-3"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPlaceholder;
