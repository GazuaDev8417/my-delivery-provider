import { useEffect, useState, useRef } from "react"
import { notifificationService } from "../../services/notifications";
import { useGlobal } from "../../hooks/useGlobal";
import {
    Container, 
    BtnStyle, 
    PopoverMenu,
    NotificationDot,
    HeaderContainer,
    TextButton,
    NotificationContainer,
    Content,
    Title,
    Time,
    UnreadDot
} from "./styled"
import { FaRegBell, FaBell } from "react-icons/fa";





interface NotificationItemProps{
    title:string
    time:string
    unread?:boolean
    onClick: () => void
}

const VITE_RESTAURANT_NOTIFICATION_URL = import.meta.env.VITE_RESTAURANT_NOTIFICATION_URL


export default function NotificationMenu(){
    const { notifications, setNotifications } = useGlobal()
    const menuRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState<boolean>(false)
    



    useEffect(()=>{
        async function loadNotifications(){
            setNotifications([])

            try{
                const data = await notifificationService.getNofifications()
                setNotifications(data)
            }catch(e:any){
                console.error(e?.response?.data?.message || e?.response?.data || e?.message)
            }
        }
        loadNotifications
    }, [])



    useEffect(()=>{
        function handleClickOutside(event:MouseEvent){
            if(menuRef.current && !menuRef.current.contains(event.target as Node)){
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(()=>{
        function handleEscape(event:KeyboardEvent){
            if(event.key === 'Escape'){
                setOpen(false)
            }            
        }
        document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)
    }, [])


    async function handleNotificationClick(id:string, message:string){
        try{
            await notifificationService.updateNotification(id)

            setNotifications(current =>
                current.map(notification =>
                    notification.id === id
                        ? { ...notification, is_read: true }
                        : notification
                )
            )

            if(message.startsWith('An order for') ||  message.startsWith('New order placed')){
                window.location.assign(VITE_RESTAURANT_NOTIFICATION_URL)
            }
        }catch(e:any){
            console.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }        
    }


    async function handleMarkAllAsRead(){
        try{
            await notifificationService.updateAllNotifications()

            setNotifications(current =>
                    current.map(notification => ({
                        ...notification,
                        is_read: true
                    })
                )
            )
        }catch(e:any){
            console.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }
    }

 
    const unreadCount = notifications.filter(notification => !notification.is_read).length
    const hasUnread = notifications.some(notification => !notification.is_read)
    


    return(
        <Container>
            <div className="position-container" ref={menuRef}>
                <BtnStyle
                    onClick={() => setOpen((prev) => !prev)}>
                    {unreadCount > 0 ? (
                        <>
                            <FaBell className="header-icon"/>
                            <NotificationDot/>
                        </>
                    ) : (
                        <FaRegBell className="header-icon"/>
                    )}
                </BtnStyle>

                <PopoverMenu $open={open}>
                    <HeaderContainer>
                        <h3 className="font-style">Notifications</h3>
                        {hasUnread && (
                            <TextButton
                                onClick={handleMarkAllAsRead}>Mark all as read</TextButton>
                        )}
                    </HeaderContainer>

                    <div className="notification-item-container">
                        {notifications.length > 0 ? (
                            notifications.map((notification)=>(
                            <NotificationItem
                                key={notification.id}
                                title={notification.notification}
                                time={notification.created_at}
                                unread={!notification.is_read}
                                onClick={() => handleNotificationClick(notification.id, notification.notification)}/>
                            ))
                        ) : (
                            <div className="no-notification-container">
                                No notifications
                            </div>
                        )}
                    </div>
                    <div className="ht-bottom"/>
                </PopoverMenu>
            </div>
        </Container>    
    )
}


function NotificationItem({ title, time, unread = false, onClick }:NotificationItemProps){
    return(
        <NotificationContainer onClick={onClick}>
            <Content>
                <div>
                    <Title>{title}</Title>
                    <Time>
                        {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Time>
                </div>
                {unread && <UnreadDot />}
            </Content>
        </NotificationContainer>
    )
}