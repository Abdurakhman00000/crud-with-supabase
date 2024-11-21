"use client"

import { usePostUserMutation } from '@/redux/api/user';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import scss from "./AddData.module.scss"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { spawn } from 'child_process';
// import { Span } from 'next/dist/trace';

interface UserFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const AddData: React.FC = () => {
  const [createUser] = usePostUserMutation();
  const { register, handleSubmit, reset } = useForm<UserFormInputs>();
  const [image, setImage] = useState<string>('');
  const router = useRouter();

  const onSubmit = async (value: UserFormInputs) => {

    try {
      const data={
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password,
        image: image,
  
      }
      await createUser(data).unwrap();
      reset(); 
      router.push('/get-user')
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file && file.type === 'image/png' || file?.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setImage(base64);
      } 
      reader.readAsDataURL(file);
    }
      
  }

  console.log(image);
  

  return (
    <section className={scss.AddData}>
      <div className="container">
      <h2>Создать пользователя</h2>
      <div >
        {
          image?<img src={image} alt="" />:<div></div>
        }
      </div>
      <input type="file" onChange={handleFileChange} accept='image/png,image/jpeg' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName', { required: true })} placeholder="Имя" />
        <input {...register('lastName', { required: true })} placeholder="Фамилия" />
        <input {...register('email', { required: true })} placeholder="Email" />
        <input {...register('password', { required: true })} placeholder="Пароль" type="password" />
        <button>Создать пользователя</button>
        <Link href='/'>
        <button>Назад</button>
        </Link>
      </form>
      </div>
    </section>
  );
};

export default AddData;
