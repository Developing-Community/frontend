import Register from './components/account/Register.vue';
import Login from './components/account/Login.vue';
import Logout from './components/account/Logout.vue';
import ResetPassword from './components/account/ResetPassword.vue';
import Account from './components/account/Account.vue';
import Home from './components/Home.vue';
import MainTemplate from './components/MainTemplate.vue';
import Profile from './components/Profile.vue';
import TelegramGroups from './components/TelegramGroups.vue';
import TelegramVerification from './components/TelegramVerification.vue';

import ListCampaign from './components/campaign/ListCampaign.vue';
import DetailsCampaign from './components/campaign/DetailsCampaign.vue';
import CreateCampaign from './components/campaign/CreateCampaign.vue';
import CampaignContentList from './components/campaign/Content/CampaignContentList.vue';
import CampaignRequests from './components/campaign/CampaignRequests.vue';

import Question from './components/content/Question.vue';
export const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        component: MainTemplate,
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
                path: '/study',
                component: ListCampaign,
                name: 'list-study'
            },
            {
                path: '/mentoring',
                component: ListCampaign,
                name: 'list-mentoring'
            },
            {
                path: '/study/create',
                component: CreateCampaign,
                name: 'create-study'
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
            {
                path: '/question/:q_slug',
                component: Question,
                name: 'question'
            },
        ]
    },
    {
        path: '/study/:campaign_id',
        component: DetailsCampaign,
        children: [
            {
                path: '',
                component: CampaignContentList,
                name: 'study-partitions',
            },
            {
                path: 'questions',
                component: CampaignContentList,
                name: 'study-questions',
            },
            {
                path: 'articles',
                component: CampaignContentList,
                name: 'study-articles',
            },
            {
                path: 'requests',
                component: CampaignRequests,
                name: 'study-requests',
            },
        ]
    },
    {
        path: '/mentoring/:campaign_id',
        component: DetailsCampaign,
        children: [
            {
                path: '',
                component: CampaignContentList,
                name: 'mentoring-partitions',
            },
            {
                path: 'questions',
                component: CampaignContentList,
                name: 'mentoring-questions',
            },
            {
                path: 'articles',
                component: CampaignContentList,
                name: 'mentoring-articles',
            },
            {
                path: 'requests',
                component: CampaignRequests,
                name: 'mentoring-requests',
            },
        ]
    },
    {
        path: '*',
        redirect: {name: 'home'},
        name: '404'
    }
];
