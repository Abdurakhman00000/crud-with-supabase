"use client";

import { useDeleteUserMutation, useGetUserQuery, useUpdataUserMutation } from '@/redux/api/user';
import React, { useEffect, useState } from 'react';
import scss from './GetData.module.scss';
import Link from 'next/link';
import Loader from '../ui/Loader';

const GetData: React.FC = () => {
  const { data, isLoading } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdataUserMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");

  // Удаление пользователя
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить этого пользователя?");
    if (confirmDelete) {
      try {
        await deleteUser(id).unwrap();
      } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
      }
    }
  };

  // Режим редактирования
  const handleEdit = (id: number, firstName: string, lastName: string) => {
    setEditingId(id);
    setNewFirstName(firstName);
    setNewLastName(lastName);
  };

  // Обновление данных пользователя
  const handleUpdate = async (id: number) => {
    try {
      const updatedUser = {
        id,
        firstName: newFirstName,
        lastName: newLastName,
      };
      await updateUser(updatedUser).unwrap(); // Отправляем обновленные данные на сервер
      setEditingId(null); // Выход из режима редактирования
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
    }
  };




  const [isLoadinger, setIsLoadinger] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadinger(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoadinger) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // Форматирование даты
  function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month}, ${year} ${hours}:${minutes}`;
  }

  return (
    <section className={scss.GetData}>
      <div className="container">
        <h1>Список пользователей</h1>
        <Link href='/'>
          <button>Назад</button>
        </Link>
        <div className={scss.content}>
          {isLoading && <p>Загрузка пользователей...</p>}
          {
            data?.slice().reverse().map((item) => (
              <div className={scss.cart} key={item.id}>
                {editingId === item.id ? (
                  <div className={scss.editForm}>
                    <input
                      type="text"
                      value={newFirstName}
                      onChange={(e) => setNewFirstName(e.target.value)}
                      placeholder="Новое имя"
                    />
                    <input
                      type="text"
                      value={newLastName}
                      onChange={(e) => setNewLastName(e.target.value)}
                      placeholder="Новая фамилия"
                    />
                    <button onClick={() => handleUpdate(item.id)}>Сохранить</button>
                    <button onClick={() => setEditingId(null)}>Отмена</button>
                  </div>
                ) : (
                  <>
                    <div className={scss.box1}>
                      <h2><span>Имя:</span> {item.firstName}</h2>
                      <h2><span>Фамилия:</span> {item.lastName}</h2>
                    </div>
                    <div className={scss.box2}>
                      <p><span>Email:</span> {item.email}</p>
                      <h5><span>Дата добавления:</span> {formatDateTime(item.createdAt)}</h5>
                      <button onClick={() => handleEdit(item.id, item.firstName, item.lastName)}>Редактировать</button>
                      <button onClick={() => handleDelete(item.id)}>Удалить</button>
                    </div>
                  </>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default GetData;