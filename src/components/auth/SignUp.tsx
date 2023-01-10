import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface LoginForm {
  email: string
  password: string
};

const schema = yup.object({
  email: yup.string().email().matches(/@[^.]*\./),
  password: yup.string().min(8).required()
}).required();

const onSubmit: SubmitHandler<LoginForm> = data => console.log(data);

const SignUp = () => {
  const [activeSubmit, setActiveSumbit] = useState(false)

  const { register, formState: { errors, isValid }, watch, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(schema)
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email && "이메일을 입력해 주세요"}
      <input {...register("password", { required: true })} />
      {errors.password && "비밀번호를 입력해 주세요"}
      <button type="submit" disabled={!isValid}>회원가입</button>
    </form>
  )
}

export default SignUp;