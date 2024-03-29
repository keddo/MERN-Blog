import { Sidebar } from 'flowbite-react';
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiInbox, HiUser  } from 'react-icons/hi';
import { FaUsers } from "react-icons/fa6";

import { TfiLayoutListPost } from "react-icons/tfi";
import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { signoutSuccess } from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const [tab, setTab] = useState('');
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab');
      if(tabFromUrl){
        setTab(tabFromUrl)
      }
    }, [location.search]);

    const handleSignout = async () => {
      try {
        const res = await fetch('/api/users/signout', {
          method: 'POST'
        });
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        }else {
          dispatch(signoutSuccess())
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    return (
    <Sidebar aria-label="Default sidebar example" className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {
            currentUser && currentUser.isAdmin && (
              <Sidebar.Item 
              href="/dashboard?tab=dash" 
              icon={HiChartPie}
              active={tab === 'dash' || !tab}
              >
                Dashboard
              </Sidebar.Item>
            )
          }
          <Sidebar.Item 
          href="/dashboard?tab=comments" 
          icon={HiAnnotation} 
          label="3">
            Comments
          </Sidebar.Item>
          {
            currentUser.isAdmin && (
              <Sidebar.Item href="/dashboard?tab=posts" 
                icon={TfiLayoutListPost }
                active={tab === 'posts'}
              >
                Posts
              </Sidebar.Item>
            )
          }
          {
            currentUser.isAdmin && (
              <Sidebar.Item href="/dashboard?tab=users" icon={FaUsers}>
                Users
              </Sidebar.Item>
            )
          }
          <Sidebar.Item 
            href="/dashboard?tab=profile" 
            icon={HiUser} 
            label={ currentUser.isAdmin ? 'Admin' : 'User' } 
            labelColor="dark">
            Profile
          </Sidebar.Item>
          <Sidebar.Item 
            icon={HiArrowSmRight}
            onClick={handleSignout}
            >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
