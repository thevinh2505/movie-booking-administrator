import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "common/components/Loading/index";
import { AdminTemplate } from "templates/AdminTemplate";
import Films from "features/admin/pages/Films";
import ShowTime from "features/admin/pages/ShowTime";
import AddFilms from "features/admin/pages/AddFilms";
import EditFilms from "features/admin/pages/EditFilms";


const SignIn = lazy(() => import("features/authentication/pages/SignIn"));

const Dashboard = lazy(() => import("features/admin/pages/Dashboard"));
export const history = createBrowserHistory();

function App() {

	return (
		<Router history={history}>
			<Suspense fallback={<Loading />}>
				<Switch>
					<AdminTemplate path="/" exact Component={Dashboard} />
					<Route path="/signin" exact component={SignIn} />
					<AdminTemplate
						path="/dashboard"
						exact
						Component={Dashboard}
					/>
					<AdminTemplate
						path="/films"
						exact
						Component={Films}
					/>
					<AdminTemplate
						path="/editfilms/:id"
						exact
						Component={EditFilms}
					/>
					<AdminTemplate
						path="/addfilms"
						exact
						Component={AddFilms}
					/>
					<AdminTemplate
						path="/showtime/:id"
						exact
						Component={ShowTime}
					/>
				</Switch>
			</Suspense>
		</Router>
	);
}

export default App;
