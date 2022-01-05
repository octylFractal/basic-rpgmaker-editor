import React from "react";
import AppNavbar from "./AppNavbar";
import {Container, Section} from "react-bulma-components";
import {SimpleErrorBoundary} from "./SimpleErrorBoundary";
import {SaveEditor} from "./SaveEditor";

const App: React.FC = () => {
    return <SimpleErrorBoundary>
        <AppNavbar/>
        <Section>
            <Container>
                <SaveEditor/>
            </Container>
        </Section>
    </SimpleErrorBoundary>;
};
export default App;
