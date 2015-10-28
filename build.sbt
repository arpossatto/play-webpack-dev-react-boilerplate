import play.PlayImport.PlayKeys.playRunHooks

name := "myApp"

version := "1.0.0"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play-slick" % "1.0.1",
  "com.typesafe.play" %% "play-slick-evolutions" % "1.0.1",
  "org.postgresql" % "postgresql" % "9.4-1201-jdbc41",
  "com.github.tototoshi" %% "slick-joda-mapper" % "2.1.0",
  "com.jason-goodwin" %% "authentikat-jwt" % "0.4.1"
)

lazy val nodeBinPath = if (RunSubProcess.isWindows) "node_modules\\.bin\\" else "./node_modules/.bin/"

lazy val prodNodeEnvCmd = if (RunSubProcess.isWindows) "SET NODE_ENV=production & " else "NODE_ENV=production "

lazy val webpackDist = TaskKey[Unit]("webpack-dist")

lazy val deployRawCmd = prodNodeEnvCmd + nodeBinPath + "webpack --config webpack.config.prod.js"

lazy val deployCmd = if (RunSubProcess.isWindows) s"cmd /c ${deployRawCmd}" else deployRawCmd

webpackDist := (Process(deployCmd, file("ui")).run)

dist <<= dist dependsOn webpackDist

stage <<= stage dependsOn webpackDist

lazy val webPackDevCmd = nodeBinPath + "webpack-dev-server --config webpack.config.dev.js --hot --inline"

playRunHooks += RunSubProcess(webPackDevCmd)
