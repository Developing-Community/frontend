import Register from './components/account/Register.vue';
import Login from './components/account/Login.vue';
import Logout from './components/account/Logout.vue';
import ResetPassword from './components/account/ResetPassword.vue';
import Account from './components/account/Account.vue';
import Home from './components/Home.vue';
import Main from './components/Main.vue';
import Profile from './components/Profile.vue';
import TelegramGroups from './components/TelegramGroups.vue';
import TelegramVerification from './components/TelegramVerification.vue';

import ListCampaign from './components/campaign/ListCampaign.vue';
import DetailsCampaign from './components/campaign/DetailsCampaign.vue';
import CreateCampaign from './components/campaign/CreateCampaign.vue';
import CampaignContentList from './components/campaign/Content/CampaignContentList.vue';
export const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        component: Main,
        name: 'main',
        path: '/',
        children: [
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
                        path: 'reset-password',
                        component: ResetPassword,
                        name: 'reset-password'
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
                component: ListCampaign,
                name: 'listcampaign'
            },
            {
                path: '/campaigns/create',
                component: CreateCampaign,
                name: 'createcampaign'
            },
            {
                path: '/campaigns/:campaign_id',
                component: DetailsCampaign,
                name: 'detailcampaign',
                children: [
                    {
                        path: 'questions',
                        component: CampaignContentList,
                        name: 'campaign-questions',
                    },
                    {
                        path: 'plans',
                        component: CampaignContentList,
                        name: 'campaign-plans',
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
                path: '/verify-token',
                component: TelegramVerification,
                name: 'verify-token'
            },
        ]
    },
    {
        path: '*',
        redirect: {name: 'home'},
        name: '404'
    }
];
