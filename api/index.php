<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "intermodular";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if(isset($_GET["login"])){
    $sql="SELECT * FROM usuarios WHERE email='".$_GET["login"]."'AND password='".$_GET["contrasenia"]."'";
    if(mysqli_query($conexionBD,$sql)){
        $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM usuarios WHERE email='".$_GET["login"]."'AND password='".$_GET["contrasenia"]."'");
        if(mysqli_num_rows($sqlEmpleaados) > 0){
            $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
            echo json_encode($empleaados);
            exit();
        } else {echo json_encode(["success"=>0]);}
    }else{  echo json_encode("".mysqli_error($sql).",".mysqli_connect_error($conexionBD)); }
}

//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre=$data->username;
    $correo=$data->email;
    $contrasenia=$data->password;
        if(($correo!="")&&($nombre!="")){
            
        $sqlEmpleaados = mysqli_query($conexionBD,"INSERT INTO usuarios(name,password,email,tipe) VALUES('$nombre','$contrasenia','$correo',1) ");
        if(mysqli_error($conexionBD)){
            echo json_encode(["success"=>0]);
        }else{
            echo json_encode(["success"=>1]);
        }
        
        }
    exit();
}

//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["contactar"])){
    $data = json_decode(file_get_contents("php://input"));
    $name=$data->name;
    $mensaje=$data->mensaje;
    $email=$data->email;
        if(($name!="")&&($mensaje!="")){
            
    $sqlEmpleaados = mysqli_query($conexionBD,"INSERT INTO formulario(name,mensaje,email) VALUES('$name','$mensaje','$email') ");
    echo json_encode(["success"=>1]);
        }
    exit();
}

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["imagenes"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM imagenes");
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["imagen"])){
    $data = json_decode(file_get_contents("php://input"));
    $url=$data->url;
    $usuario_id=$data->usuario_id;
        if($url!=""){
            
    $sqlEmpleaados = mysqli_query($conexionBD,"INSERT INTO imagenes(url,usuario_id) VALUES('$url',$usuario_id) ");
    echo json_encode(["success"=>1]);
        }
    exit();
}
//Inserta un nuevo post 
if(isset($_GET["posts"])){
    $data = json_decode(file_get_contents("php://input"));
    $titulo=$data->titulo;
    $mensaje=$data->mensaje;
    $usuario_id=$data->usuario_id;
        if(($mensaje!="")&&($titulo!="")){
            
    $sqlPosts = mysqli_query($conexionBD,"INSERT INTO posts(titulo,mensaje,publicada,usuario_id) VALUES('$titulo','$mensaje',0,$usuario_id) ");
    echo json_encode(["success"=>1]);
        }
    exit();
}

if (isset($_GET["postsTodos"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM posts");
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if (isset($_GET["tusPosts"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM posts WHERE usuario_id = ".$_GET["tusPosts"]);
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if (isset($_GET["postsVer"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM posts WHERE publicada = 1");
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
if (isset($_GET["postsNoVer"])){
    $sql = "SELECT * FROM posts WHERE publicada = 0";
    
    if(mysqli_query($conexionBD,$sql)){
        $sqlEmpleaados = mysqli_query($conexionBD,$sql);
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode("".$sql.",".mysqli_error($conexionBD)); }
}

if (isset($_GET["usuariosVer"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM usuarios");
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if(isset($_GET["publicar"])){

    $data = json_decode(file_get_contents("php://input"));
   $id=$data->id;

    $sqlEmpleaados = mysqli_query($conexionBD,"UPDATE posts SET publicada=1 WHERE id=".$_GET["publicar"]);
    echo json_encode(["success"=>1]);
    exit();
}

//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"DELETE FROM posts WHERE id=".$_GET["borrar"]);
    if($sqlEmpleaados){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
// Consulta todos los registros de la tabla empleados
$sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM usuarios");
if(mysqli_num_rows($sqlEmpleaados) > 0){
    $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
    echo json_encode($empleaados);
}
else{ echo json_encode([["success"=>0]]); }


?>