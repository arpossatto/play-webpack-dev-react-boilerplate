package controllers
 
import play.api.mvc._
import play.api.libs.json._

object Application extends Controller {
 
	def index = Action {
		val (bundleUrl,styleUrl) = if (play.api.Play.isDev(play.api.Play.current)) {
			("http://localhost:8080/assets/bundle.js",
		     "http://localhost:8080/assets/style.css")
	    } else {
	    	(routes.Assets.at("bundle.js").toString,
	    	 routes.Assets.at("style.css").toString)
	    }
		Ok(views.html.index(bundleUrl,styleUrl))
	}

}