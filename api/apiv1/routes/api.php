<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*======== Users Controllers ========*/
use App\Http\Controllers\Api\Users\PesquisarTokenController;
use App\Http\Controllers\Api\Users\VerificaLoginUsersController;
use App\Http\Controllers\Api\Users\AlterarImagemUsersController;

//Admin
use App\Http\Controllers\Api\Users\Admin\AdminController;
use App\Http\Controllers\Api\Users\Admin\AdminAuthController;
use App\Http\Controllers\Api\Users\Admin\AdminPasswordResetRequestController;
use App\Http\Controllers\Api\Users\Admin\AdminChangePasswordController;

//Entregador
use App\Http\Controllers\Api\Users\Entregador\EntregadorAuthController;
use App\Http\Controllers\Api\Users\Entregador\EntregadorController;
use App\Http\Controllers\Api\Users\Entregador\EntregadorPasswordResetRequestController;
use App\Http\Controllers\Api\Users\Entregador\EntregadorChangePasswordController;

//Cliente
use App\Http\Controllers\Api\Users\Cliente\ClienteController;
use App\Http\Controllers\Api\Users\Cliente\ClienteAuthController;
use App\Http\Controllers\Api\Users\Cliente\ClientePasswordResetRequestController;
use App\Http\Controllers\Api\Users\Cliente\ClienteChangePasswordController;

//Controllers
use App\Http\Controllers\Api\CidadeController;
use App\Http\Controllers\Api\EnderecoController;
use App\Http\Controllers\Api\EnderecoCidadeController;
use App\Http\Controllers\Api\ProdutoController;
use App\Http\Controllers\Api\ProdutoCidadeController;
use App\Http\Controllers\Api\PedidoController;
use App\Http\Controllers\Api\FeedbackPedidoController;
use App\Http\Controllers\Api\PesoProdutoController;
use App\Http\Controllers\Api\ItensPedidoController;

//Pagamento
use App\Http\Controllers\Api\Pagamento\PagamentoController;

/*======== Views Controllers ========*/
//Cliente
use App\Http\Controllers\Api\Views\Cliente\EnderecosClienteController;
use App\Http\Controllers\Api\Views\Cliente\HistoricoPedidosController;
//Admin
use App\Http\Controllers\Api\Views\Admin\DashboardAdminController;
//Entregador
use App\Http\Controllers\Api\Views\Entregador\PedidosEntregadorController;
use App\Http\Controllers\Api\Views\Entregador\StatusEntregaController;

/*
|--------------------------------------------------------------------------
| ROTAS PÚBLICAS
|--------------------------------------------------------------------------
*/
Route::get('cidades-ativas', [CidadeController::class, 'cidadesAtivas']);

/*
|--------------------------------------------------------------------------
| ROTAS DE VERIFICAÇÃO DE USUÁRIO
|--------------------------------------------------------------------------
*/
Route::post('/auth/users', [VerificaLoginUsersController::class, 'verificaUsers']);
Route::get('/auth/users/email/{id}', [VerificaLoginUsersController::class, 'verificaUsersForgotPassword']);

/*
|--------------------------------------------------------------------------
| ROTAS DOS USUÁRIOS
|--------------------------------------------------------------------------
*/
Route::post('/auth/cliente/register', [ClienteAuthController::class, 'register']);
Route::post('/auth/cliente/login', [ClienteAuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| ROTAS DE CRIAÇÃO USER EMPRESA NO PAINEL E APP
|--------------------------------------------------------------------------
*/
//Solicita o reset
// Route::post('sendPasswordResetLink/user', [UserPasswordResetRequestController::class, 'sendEmail']);
// //Altera a senha
// Route::post('resetPassword/user', [UserChangePasswordController::class, 'passwordResetProcess']);
// Route::post('pesquisarTokenUser', [PesquisarTokenController::class, 'user']);

Route::post('callback', [PagamentoController::class, 'callbackPicPay']);

Route::group(['middleware' => ['sanctum.abilities:cliente', 'auth:sanctum']], function () {
    //Rotas de perfil
    Route::get('cliente/me/{id}', [ClienteAuthController::class, 'me']);
    Route::put('cliente/alterar-senha/{id}', [ClienteAuthController::class, 'alterarSenha']);
    Route::put('cliente/editar-perfil/{id}', [ClienteAuthController::class, 'editarPerfil']);
    Route::post('cliente/profile/{id}', [AlterarImagemUsersController::class, 'imageProfileCliente']);
    //Rota de logout
    Route::post('auth/cliente/logout/{id}', [ClienteAuthController::class, 'logout']);

    //Endereços
    Route::get('cliente/meus-enderecos/{id}', [EnderecosClienteController::class, 'meusEnderecos']);
    Route::get('cliente/cidades-ativas', [CidadeController::class, 'cidadesAtivas']);
    Route::apiResource('cliente/enderecos', EnderecoController::class)->only(['show', 'store', 'update', 'destroy']);

    //Pedidos
    Route::get('cliente/historico/{id}', [HistoricoPedidosController::class, 'meusPedidos']);
    Route::get('cliente/produtos/{id}', [ProdutoController::class, 'produtosAtivos']);
    Route::apiResource('cliente/pedidos', PedidoController::class)->only(['store', 'update', 'delete']);
    Route::apiResource('cliente/feedback', FeedbackPedidoController::class)->only(['store', 'update']);

    //Pagamento
    Route::post('cliente/pagamento', [PagamentoController::class, 'picPay']);
    Route::post('cliente/cancel', [PagamentoController::class, 'cancelOrderPicPay']);
    Route::get('cliente/pagamento/status/{id}', [PagamentoController::class, 'statusOrderPicPay']);

    //Alterar status entrega
    Route::put('cliente/pedido/status/{id}', [StatusEntregaController::class, 'alterarStatus']);

});


/*
|--------------------------------------------------------------------------
| ROTAS DOS ENTREGADORES
|--------------------------------------------------------------------------
*/
Route::post('/auth/entregador/login', [EntregadorAuthController::class, 'login']);
// Route::post('/auth/entregador/register', [EmpresaAuthController::class, 'register']);

//Solicita o reset
// Route::post('sendPasswordResetLink/empresa', [EmpresaPasswordResetRequestController::class, 'sendEmail']);
// //Altera a senha
// Route::post('resetPassword/empresa', [EmpresaChangePasswordController::class, 'passwordResetProcess']);
// Route::post('pesquisarTokenEmpresa', [PesquisarTokenController::class, 'empresa']);

Route::group(['middleware' => ['sanctum.abilities:entregador', 'auth:sanctum']],function () {
    //Rotas de perfil
    Route::get('entregador/me/{id}', [EntregadorAuthController::class, 'me']);
    Route::put('entregador/alterar-senha/{id}', [EntregadorAuthController::class, 'alterarSenha']);
    Route::put('entregador/editar-perfil/{id}', [EntregadorAuthController::class, 'editarPerfil']);
    Route::post('entregador/profile/{id}', [AlterarImagemUsersController::class, 'imageProfileEntregador']);
    //Rota de logout
    Route::post('auth/entregador/logout/{id}', [EntregadorAuthController::class, 'logout']);

    //Minhas entregas a fazer
    Route::get('entregador/pedidos/{id}', [PedidosEntregadorController::class, 'pedidosEntregar']);

    //Minhas entregas feitas
    Route::get('entregador/entregues/{id}', [PedidosEntregadorController::class, 'pedidosEntregues']);

    //Alterar status entrega
    Route::put('entregador/status/{id}', [StatusEntregaController::class, 'alterarStatus']);
});

/*
|--------------------------------------------------------------------------
| ROTAS DOS ADMINISTRADORES
|--------------------------------------------------------------------------
*/

Route::post('/auth/admin/login', [AdminAuthController::class, 'login']);

//Solicita o reset
// Route::post('sendPasswordResetLink/admin', [AdminPasswordResetRequestController::class, 'sendEmail']);
// //Altera a senha
// Route::post('resetPassword/admin', [AdminChangePasswordController::class, 'passwordResetProcess']);
// Route::post('pesquisarTokenAdmin', [PesquisarTokenController::class, 'admin']);

Route::group(['middleware' => ['sanctum.abilities:admin', 'auth:sanctum']],function () {
    //Rotas de perfil
    Route::get('admin/me/{id}', [AdminAuthController::class, 'me']);
    Route::put('admin/alterar-senha/{id}', [AdminAuthController::class, 'alterarSenha']);
    Route::put('admin/editar-perfil/{id}', [AdminAuthController::class, 'editarPerfil']);
    Route::post('admin/profile/{id}', [AlterarImagemUsersController::class, 'imageProfileAdmin']);
    //Rota de logout
    Route::post('auth/admin/logout/{id}', [AdminAuthController::class, 'logout']);

    //Rotas de acesso
    //Usuários
    Route::apiResource('admin/admins', AdminController::class);
    Route::apiResource('admin/clientes', ClienteController::class);
    Route::apiResource('admin/entregadores', EntregadorController::class);

    //Clientes
    //Endereço cliente
    Route::get('admin/cliente/enderecos/{id}', [EnderecosClienteController::class, 'meusEnderecos']);
    //Histórico de pedidos do cliente
    Route::get('admin/cliente/historico/{id}', [HistoricoPedidosController::class, 'meusPedidos']);

    //Dashboard
    Route::get('admin/dashboard', [DashboardAdminController::class, 'dashboard']);

    //Endereços
    Route::apiResource('admin/enderecos', EnderecoController::class);
    Route::apiResource('admin/cidades', CidadeController::class);
    Route::get('admin/cidades-ativas', [CidadeController::class, 'cidadesAtivas']);

    //Produtos
    Route::apiResource('admin/produtos', ProdutoController::class);
    Route::apiResource('admin/produtos-cidades', ProdutoCidadeController::class);

    //Pedidos
    Route::apiResource('admin/pedidos', PedidoController::class);
    Route::apiResource('admin/feedback/pedidos', FeedbackPedidoController::class);

    //Alterar status do pedido
    Route::put('admin/pedido/status/{id}', [StatusEntregaController::class, 'alterarStatus']);

    //Rotas para painel administrativo
    Route::get('admin/listAdmins/{id}', [AdminController::class, 'listAdmins']);

    //Adicionar entregador ao pedido
    Route::put('admin/alterar-entregador/{id}', [StatusEntregaController::class, 'adicionarEntregador']);
});


