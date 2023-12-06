import React from 'react';
// import { JitsiMeeting } from '@jitsi/react-sdk';
import { JaaSMeeting } from '@jitsi/react-sdk'
import { useParams } from "react-router-dom";

const ReservedSession = () => {

    const { id, room } = useParams();

    const YOUR_APP_ID = "vpaas-magic-cookie-915aa11ce167415c8b96071968facdbe"

    const externalApi = "vpaas-magic-cookie-915aa11ce167415c8b96071968facdbe/053e40"

    return (
        <div>
            <JaaSMeeting
                appId={YOUR_APP_ID}
                roomName={room}
                // jwt={YOUR_VALID_JWT}
                configOverwrite={{
                    disableThirdPartyRequests: true,
                    disableLocalVideoFlip: true,
                    backgroundAlpha: 0.5
                }}
                interfaceConfigOverwrite={{
                    VIDEO_LAYOUT_FIT: 'nocrop',
                    MOBILE_APP_PROMO: false,
                    TILE_VIEW_MAX_COLUMNS: 4
                }}
            // spinner={SpinnerView}
            // onApiReady={(externalApi) => { ... } }
            />
        </div>
    );
};

export default ReservedSession;