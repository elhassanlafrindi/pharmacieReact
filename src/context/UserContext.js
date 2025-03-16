// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// إنشاء الـ Context للمستخدم
const UserContext = createContext();

// هوك للوصول بسهولة إلى الـ Context الخاص بالمستخدم
export const useUserContext = () => {
  return useContext(UserContext);
};

// مزود الـ Context
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // دالة لتحديث بيانات المستخدم
  const setUser = (data) => {
    setUserData(data); // حفظ بيانات المستخدم في الحالة
  };

  // دالة لمسح بيانات المستخدم
  const clearUser = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUser, clearUser }}>
      {children} {/* مكونات التطبيق التي سيتم تغليفها */}
    </UserContext.Provider>
  );
};
