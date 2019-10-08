/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
import { vuexOidcProcessSilentSignInCallback } from 'vuex-oidc'
import { oidcSettings } from '@/config/OIDCSettings'

vuexOidcProcessSilentSignInCallback(oidcSettings)
