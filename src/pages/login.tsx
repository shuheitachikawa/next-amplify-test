import styles from "../styles/Home.module.css";

import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import { NextPage } from "next";
import { Layout } from "../components/Layout";

Amplify.configure({ ...awsExports, ssr: true });

const Login: NextPage = () => {
  return (
    <Layout>
      <AmplifyAuthenticator>
        <div>
          <AmplifySignIn />
          <AmplifySignOut />
        </div>
      </AmplifyAuthenticator>
    </Layout>
  );
};

export default Login;
