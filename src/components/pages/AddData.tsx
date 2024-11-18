"use client"

import { usePostUserMutation } from '@/redux/api/user';
import React from 'react';
import { useForm } from 'react-hook-form';
import scss from "./AddData.module.scss"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

const AddData: React.FC = () => {
  const [createUser] = usePostUserMutation();
  const { register, handleSubmit, reset } = useForm<UserFormInputs>();
  const router = useRouter()

  const onSubmit = async (data: UserFormInputs) => {
    try {
      await createUser(data).unwrap();
      reset(); 
      router.push('/get-user')
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
    }
  };

  return (
    <section className={scss.AddData}>
      <div className="container">
      <h2>Создать пользователя</h2>
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
