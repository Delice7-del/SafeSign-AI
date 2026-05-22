@echo off
setlocal
set "W_DIR=%~dp0"
set "W_JAR=%W_DIR%.mvn\wrapper\maven-wrapper.jar"
set "JAVA_EXE=java"

if not "%JAVA_HOME%" == "" set "JAVA_EXE=%JAVA_HOME%\bin\java"

"%JAVA_EXE%" -classpath "%W_JAR%" "-Dmaven.multiModuleProjectDirectory=%W_DIR%." org.apache.maven.wrapper.MavenWrapperMain %*
