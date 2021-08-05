import {Container} from "@material-ui/core";
import React, {FunctionComponent, PropsWithChildren, ReactElement} from "react";

export const DefaultLayout: FunctionComponent<PropsWithChildren<any>> = (props): ReactElement => {
    return (
        <Container maxWidth={false} disableGutters={true}>
            {props.children}
        </Container>

    )
}

