import styles from "../styles/Home.module.css";

import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from "@aws-amplify/ui-react";
import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import awsExports from "../aws-exports";
import { NextPage } from "next";
// import Layout from "../components/Layout";

Amplify.configure({ ...awsExports, ssr: true });

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <AmplifyAuthenticator>
        <div>
          <AmplifySignIn />
          <AmplifySignOut />
        </div>
      </AmplifyAuthenticator>
    </div>
  );
};

export default Login;
