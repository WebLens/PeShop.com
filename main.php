<?php
	if($_COOKIE['user']!=""){
		header('Location: home.html');
	}
?>

<!DOCTYPE html>
<html lang="ru">

<head>
	<title>PeShop</title>
	<meta charset="UTF-8">
	<meta name="format-detection" content="telephone=no">
	<!-- <style>body{opacity: 0;}</style> -->
	<link rel="stylesheet" href="css/style.min.css?_v=20220314162013">
	<link rel="shortcut icon" href="img/icons/logo-mini.svg" type="image/x-icon">
	<!-- <meta name="robots" content="noindex, nofollow"> -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
	<div class="wrapper">
		<main class="page">

			<div class="autorisation">
				<div class='autorisation__container'>
	
					<div class="autorisation__title">
						<h1 class="title">Пожалуйста, выберите тип входа на сайт</h1>
					</div>
					<form action="" class="autorisation__form form-autorisation" onsubmit=" return false">
						<div class="form-autorisation__wrap">
							<p class="form-autorisation__label"><input type="radio" name="users" value="guest" class="form-autorisation__inpt"> Я гость</p>
							<p class="form-autorisation__label"><input type="radio" name="users" value="user" class="form-autorisation__inpt"> Авторизоваться</p>
						</div>
						<button type="submit" class="form-autorisation__btn button">Подтвердить</button>
					</form>
				</div>
			</div>
		</main>
	</div>

	<div id="popup" aria-hidden="true" class="popup">
		<div class="popup__wrapper">
			<div class="popup__content">
				<button data-close type="button" class="popup__close"><img src="img/icons/close.svg" alt="Иконка"></button>
				<div class="popup__content content-popap">
					<div class="content-popap__title">
						<h2 class="title">Ваш товар</h2>
					</div>
					<div class="content-popap__row">
						<div class="content-popap__column content-popap-column">
							<!-- <div class="shop__column column-shop">
							<picture><source srcset="img/shop/nuke_trein.webp" type="image/webp"><img id="content-popap__img" src="img/shop/nuke_trein.jpg" alt="Картинка"></picture>
							<div class="column-shop__body">
								<h3 id="content-popap__title" class="column-shop__title">
									Кроссовок Nuke
								</h3>
								<div id="content-popap__desc"  class="column-shop__desc">Кроссовки для тех, кто хочет выглядеть эффектно даже во время тренировок по бездорожью</div>
							</div>
							<p  class="column-shop__price"><span id="content-popap__price">5990</span> р.</p>
						</div> -->
						</div>
						<div class="content-popap__column content-popap-column">
							<h3 class="content-popap-column__title">Выберите количество</h3>
							<div class="content-popap-column__quantity quantity">
								<button type="button" class="content-popap-column-quantity__btn quantity__button quantity__button_plus">+</button>
								<div class="quantity__input">
									<input disabled="disabled" autocomplete="off" type="text" class="content-popap-column-quantity__result" name="form[]" value="1">
								</div>
								<button type="button" class="content-popap-column-quantity__btn quantity__button quantity__button_minus">-</button>
							</div>
							<div class="content-popap-column__desc">
								Ваш заказ будет готов завтра и вы сможетете забрать и оплатить его c 8 00 до 22 00 в нашем магазине по адресу: 21000 West Ten Mile Road Southfield MI 48075-1058 USA
							</div>
							<h3 class="content-popap-column__title">Итог</h3>
							<p id="content-popap__result-price" class="content-popap-column__price _icon-ruble">5590</p>
							<button type="button" class="content-popap-column__button button">Заказать</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>



	<div id="popup_autorisation" aria-hidden="true" class="popup">
		<div class="popup__wrapper">
			<div class="popup__content">
				<button data-close type="button" class="popup__close"><img src="img/close-autorisation.svg" alt="Иконка"></button>
				<div class="popap__wrap">
					<form action="php/bd.php" onsubmit="" method="POST" class="popap__form form-popap">
						<h3 class="form-popap__title">Авторизация</h3>
						<p class="mistake"><?php if($error!="") print_r($error) ?></p>
						<p><label for="login">Логин</label><input type="text" name="login" class="form-popap__input"></p>
						<p><label for="psw">Пароль</label><input type="password" name="psw" class="form-popap__input"></p>
						<button type="submit" class="form-popap__btn button">Войти</button>
					</form>
				</div>
			</div>
		</div>

	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js?_v=20220314162013"></script>
	<script src="js/app.js?_v=20220314162013"></script>

</body>

</html>