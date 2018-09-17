import Register from './components/account/Register.vue';
import Login from './components/account/Login.vue';
import Logout from './components/account/Logout.vue';
import Account from './components/account/Account.vue';
import Home from './components/Home.vue';
import Profile from './components/Profile.vue';
import TelegramGroups from './components/TelegramGroups.vue';

import Campaign from './components/campaign/Campaign.vue';
import ListCampaign from './components/campaign/ListCampaign.vue';
import DetailsCampaign from './components/campaign/DetailsCampaign.vue';
import CreateCampaign from './components/campaign/CreateCampaign.vue';
export const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/account',
        component: Account,
        name: 'account',
        children: [
            {
                path: 'login',
                component: Login,
                name: 'login'
            },
            {
                path: 'register',
                component: Register,
                name: 'register'
            },
            {
                path: 'logout',
                component: Logout,
                name: 'logout'
            },
        ]
    },
    {
        path: '/campaigns',
        component: Campaign,
        name: 'campaigns',
        children: [
            {
                path: '',
                component: ListCampaign,
                name: 'listcampaign'
            },
            {
                path: 'create',
                component: CreateCampaign,
                name: 'createcampaign'
            },
            {
                path: ':id',
                component: DetailsCampaign,
                name: 'detailcampaign'
            },
        ]
    },
    {
        path: '/profile',
        component: Profile,
        name: 'profile'
    },
    {
        path: '/groups',
        component: TelegramGroups,
        name: 'groups'
    },
    {
        path: '*',
        redirect: {name: 'home'}
    }
];
