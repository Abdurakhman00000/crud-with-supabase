import React from 'react'
import scss from "./Header.module.scss"
import Link from 'next/link'

const Header = () => {
  return (
    <header className={scss.Header}>
        <div className="container">
            <div className={scss.content}>
                <h1>AddUsers</h1>
                <div className={scss.nav}>
                    <Link href='/add-user'>
                    <p>Добавить пользователья</p>
                    </Link>
                    <Link href='/get-user'>
                    <p>Посмотреть пользователей</p>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header