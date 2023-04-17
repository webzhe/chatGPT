import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface UserInfo {
    avatar: string;
    name: string;
    description: string;
}

export interface userStoreInterface {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

export const UserStore = createContext<userStoreInterface>({} as userStoreInterface);

const User: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState({
        avatar: "/author.jpg",
        name: "azhe",
        description:
            'Star on <a href="https://github.com/webzhe/chatGPT" class="color-[#3050fb]" target="_blank" >Github</a>',
    });
    return <UserStore.Provider value={{ userInfo, setUserInfo }}>{children}</UserStore.Provider>;
};

export default User;
