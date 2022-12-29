import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginnn } from "../../Api/authApi";
import { Tuser } from "../../models/user";
import { login } from "../../redux/auth";
import Link from 'next/link';
import {
  faEyeSlash,
  faEye
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tuser>();
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const onsubmit = async (value: Tuser) => {
    console.log(value);
    try {
      const { token, user } = await loginnn(value);

      dispatch(login(user));
      localStorage.setItem("auth_token", token);
      toast.success("Đăng nhập thành công");
      if (token) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(`${error.response.data.error}`);
    }
  };
  //show/hiden
 const [type, setType] = useState('password')
 const [icon, setIcon] = useState(faEyeSlash)
 const handleToggle = () =>{
  if(type==='password'){
    setIcon(faEye);
    setType('text')
  }
  else{
    setIcon(faEyeSlash);
    setType('password')
  }
 }
  return (
    <div className="h-screen w-[1240px] mx-auto">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <picture>
            <img
              src="https://res.cloudinary.com/dtrhnbxye/image/upload/v1671685928/Group_10055_1_vppv7v.png"
              className="w-full h-[480px]"
              alt="Sample image"
            />
            </picture>
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <h2 className="text-2xl text-center mb-[40px]">Đăng nhập</h2>
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email của bạn"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <span className="text-red-700">is required</span>
                )}
              </div>

              <div className="mb-6 relative">
                <input
                  type={type}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Mật khẩu"
                  {...register("password", { required: true })}
                />
                <span className="absolute cursor-pointer bottom-[10px] right-[20px]" onClick={handleToggle}><FontAwesomeIcon icon={icon}/></span>
                
                {errors.password?.type === "required" && (
                  <span className="text-red-700">is required</span>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                <input id="remember_me" name="remember_me" type="checkbox"
                  className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                  <label htmlFor="remember_me" className="form-check-label inline-block text-gray-800 mb-[4px] ml-[4px]">
                    Nhớ mật khẩu{" "}
                  </label>
                </div>
                {/* <a href="#!" className="text-gray-800">
                  Quên mật khẩu?
                </a> */}
              </div>

              <div className="text-center lg:text-left">
                <button className="inline-block px-7 py-3 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Đăng nhập
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  <Link href="/register">
                  <a className="text-black text-lg  focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Đăng ký
                  </a>
                  </Link>
                </p>
              </div>
              {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">Hoặc</p>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;