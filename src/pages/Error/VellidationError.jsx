import React from "react";

const VellidationError = () => {
  const handleGoToMail = () => {
    window.open("https://www.istockphoto.com/vector/mail-application-gm1399508573-453355026?searchscope=image%2Cfilm", "_blank")
  };
  return (
    <div>
      <div className="bg-black dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-emerald-600 dark:text-emerald-500 animate-bounce">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-400 md:text-4xl dark:text-white">
              Verify Your Email.
            </p>
            <p className="mb-4 text-lg font-light text-gray-400 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <button
              onClick={handleGoToMail}
              className="inline-flex text-emerald-500 bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VellidationError;
