import { DevicePlatform, PaletteOption, ScreenConfig, ThemeMode } from '../types';

export const COLOR_PALETTES: PaletteOption[] = [
  {
    id: 'luna',
    name: 'Luna Ocean (Ciano & Azul)',
    // primary/secondary definidos por contraste medido, não por gosto:
    // #26658C com texto branco = 6.32:1 (aprova WCAG AA)
    // #54ACBF com texto branco = 2.62:1 (reprova) — serve como destaque, e como
    // primary APENAS no tema escuro, onde contrasta 6.47:1 com o azul-noite.
    // Não inverter de volta.
    primary: '#26658C',   // Azul Médio — ação primária no tema claro
    secondary: '#54ACBF', // Ciano — destaque
    accentGreen: '#A7EBF2', // Ciano Suave
    neutralGray: '#023859', // Azul Escuro Slate
    surfaceLight: '#F7FAFC',
    surfaceDark: '#023859',
    backgroundLight: '#FCFDFE',
    backgroundDark: '#011C40',
  },
  {
    id: 'material-blue-green',
    name: 'Material 3 Azul & Verde',
    primary: '#1E88E5', // Material Blue
    secondary: '#2E7D32', // Emerald Green
    accentGreen: '#4CAF50',
    neutralGray: '#607D8B', // Slate / Blue Gray
    surfaceLight: '#FFFFFF',
    surfaceDark: '#1E293B',
    backgroundLight: '#F8FAFC',
    backgroundDark: '#0F172A',
  },
  {
    id: 'slate-blue-mint',
    name: 'Azul Executivo & Menta',
    primary: '#2563EB',
    secondary: '#10B981',
    accentGreen: '#34D399',
    neutralGray: '#64748B',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#1E293B',
    backgroundLight: '#F1F5F9',
    backgroundDark: '#090D16',
  },
  {
    id: 'cyber-green-blue',
    name: 'Verde Floresta & Azul Céu',
    primary: '#0D9488',
    secondary: '#0284C7',
    accentGreen: '#10B981',
    neutralGray: '#475569',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#111827',
    backgroundLight: '#F0FDFA',
    backgroundDark: '#030712',
  },
];

export function generateFlutterThemeCode(palette: PaletteOption): string {
  return `// =============================================================================
// FONTE ÚNICA DE VERDADE VISUAL — Run Forest Run
// =============================================================================
// Este arquivo é CONGELADO. Nenhum gerador de código (Google AI Studio,
// Antigravity) deve redefinir cores, raios, tipografia ou tamanhos de botão.
// Telas devem IMPORTAR este tema e consumir apenas Theme.of(context).
//
// Alterações aqui são decisão de produto e passam por revisão. Ver TOKENS.md
// para o racional de cada escolha (inclusive as medições de contraste).
// =============================================================================

import 'package:flutter/material.dart';

/// Paleta Luna Ocean — os valores brutos.
///
/// ATENÇÃO: fora deste arquivo, NÃO use estas constantes. Use
/// \`Theme.of(context).colorScheme.<papel>\`. As constantes existem apenas para
/// alimentar o ColorScheme abaixo.
abstract final class LunaOcean {
  /// Ciano. Contraste com branco = 2.62:1 → REPROVA WCAG AA.
  /// Nunca usar como fundo de texto branco. É cor de destaque sobre escuro
  /// (6.47:1 contra o azul-noite) e serve como \`secondary\` no tema claro.
  static const Color ciano = Color(0xFF54ACBF);

  /// Azul médio. Contraste com branco = 6.32:1 → APROVA WCAG AA.
  /// É a cor de ação primária do produto no tema claro.
  static const Color azulMedio = Color(0xFF26658C);

  /// Azul profundo. Contraste com branco = 12.26:1.
  /// Superfície elevada do tema escuro.
  static const Color azulProfundo = Color(0xFF023859);

  /// Azul-noite. Contraste com branco = 16.92:1.
  /// Fundo do tema escuro e cor de texto de maior ênfase no tema claro.
  static const Color azulNoite = Color(0xFF011C40);
}

/// Escala de espaçamento — múltiplos de 8, sem exceção.
///
/// Use \`AppSpacing.md\` em vez de \`16\`. Um número solto num Padding é um bug
/// de design system, não um detalhe.
abstract final class AppSpacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 16;
  static const double lg = 24;
  static const double xl = 32;
  static const double xxl = 48;
  static const double xxxl = 64;
}

/// Raios de canto. Três valores, e só.
abstract final class AppRadius {
  /// Checkbox, badges pequenos.
  static const double xs = 4;

  /// Campos, botões, chips.
  static const double sm = 12;

  /// Cards e superfícies de conteúdo.
  static const double md = 16;

  /// Bottom sheets e diálogos.
  static const double lg = 28;
}

/// Larguras máximas de conteúdo por breakpoint.
///
/// O produto roda em Android, iOS e Web. Formulário esticado de ponta a ponta
/// num monitor de 1920px é o defeito mais comum de Flutter Web — use
/// [AppBreakpoints.formMaxWidth] em todo fluxo de formulário.
abstract final class AppBreakpoints {
  /// Abaixo disso, layout de uma coluna (celular).
  static const double compact = 600;

  /// Entre compact e expanded: tablet / janela estreita.
  static const double medium = 840;

  /// Acima disso, layout de painel (web do treinador).
  static const double expanded = 1200;

  /// Formulários nunca passam disso, em nenhuma tela.
  static const double formMaxWidth = 480;

  /// Conteúdo de leitura (listas, detalhe de treino).
  static const double contentMaxWidth = 840;
}

abstract final class AppTheme {
  // ---------------------------------------------------------------------------
  // TEMA CLARO
  // ---------------------------------------------------------------------------
  static ThemeData get light => _build(_lightScheme);

  static final ColorScheme _lightScheme = ColorScheme.fromSeed(
    seedColor: LunaOcean.azulMedio,
    brightness: Brightness.light,
    // Papéis fixados à mão — o fromSeed sozinho não respeita a paleta da marca.
    primary: LunaOcean.azulMedio,
    onPrimary: Colors.white,
    secondary: LunaOcean.ciano,
    // Texto sobre ciano precisa ser escuro: branco sobre ciano é 2.62:1.
    onSecondary: LunaOcean.azulNoite,
    surface: const Color(0xFFFCFDFE),
    onSurface: LunaOcean.azulNoite,
    // 5.25:1 sobre o fill do campo — rótulo e helper são texto, pedem 4.5:1.
    onSurfaceVariant: const Color(0xFF5A6B7A),
    surfaceContainerLowest: Colors.white,
    surfaceContainerLow: const Color(0xFFF7FAFC),
    surfaceContainer: const Color(0xFFF1F5F9),
    surfaceContainerHigh: const Color(0xFFE8EFF4),
    surfaceContainerHighest: const Color(0xFFDFE9F0),
    outline: const Color(0xFF7A8B99),
    outlineVariant: const Color(0xFFC7D3DC),
  );

  // ---------------------------------------------------------------------------
  // TEMA ESCURO
  // ---------------------------------------------------------------------------
  // O atleta abre o app de madrugada e ao sol. O modo escuro não é enfeite —
  // é o modo em que metade dos usuários vai viver. Ele NÃO pode sumir.
  static ThemeData get dark => _build(_darkScheme);

  static final ColorScheme _darkScheme = ColorScheme.fromSeed(
    seedColor: LunaOcean.azulMedio,
    brightness: Brightness.dark,
    // No escuro os papéis invertem: o ciano é quem tem contraste (6.47:1
    // contra o azul-noite), então ele vira a ação primária.
    primary: LunaOcean.ciano,
    onPrimary: LunaOcean.azulNoite,
    secondary: const Color(0xFF8FD0DE),
    onSecondary: LunaOcean.azulNoite,
    surface: LunaOcean.azulNoite,
    onSurface: const Color(0xFFE3ECF2),
    // 8.12:1 sobre o fill do campo no escuro.
    onSurfaceVariant: const Color(0xFFA9BECD),
    surfaceContainerLowest: const Color(0xFF00142E),
    surfaceContainerLow: const Color(0xFF01234C),
    surfaceContainer: LunaOcean.azulProfundo,
    surfaceContainerHigh: const Color(0xFF0B4468),
    surfaceContainerHighest: const Color(0xFF13527A),
    outline: const Color(0xFF7E97AB),
    outlineVariant: const Color(0xFF31506B),
  );

  // ---------------------------------------------------------------------------
  // CONSTRUÇÃO COMPARTILHADA
  // ---------------------------------------------------------------------------
  // Claro e escuro compartilham TODA a estrutura. A única diferença permitida
  // entre eles é o ColorScheme. Foi divergir daqui que produziu dois temas
  // incompatíveis nos primeiros protótipos.
  static ThemeData _build(ColorScheme scheme) {
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: scheme.surface,

      appBarTheme: AppBarTheme(
        centerTitle: false,
        elevation: 0,
        scrolledUnderElevation: 3,
        backgroundColor: scheme.surface,
        foregroundColor: scheme.onSurface,
        surfaceTintColor: scheme.surfaceTint,
      ),

      cardTheme: CardThemeData(
        elevation: 0,
        color: scheme.surfaceContainerLow,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          side: BorderSide(color: scheme.outlineVariant),
        ),
      ),

      // Altura 48 é o mínimo de acessibilidade para alvo de toque.
      // Não use Size.fromHeight aqui: largura infinita quebra botões em Row.
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          minimumSize: const Size(64, 48),
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppRadius.sm),
          ),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size(64, 48),
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppRadius.sm),
          ),
        ),
      ),

      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          minimumSize: const Size(48, 48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppRadius.sm),
          ),
        ),
      ),

      // Campo no padrão FILLED do M3: preenchimento sutil, cantos superiores
      // arredondados, indicador na base. Sem caixa fechada em volta — é o
      // visual limpo pedido, e é a variante canônica do Material 3.
      //
      // O indicador inativo NUNCA é BorderSide.none. O fill sozinho dá 1.03:1
      // contra a surface: como demarcação ele é invisível, e o usuário perde a
      // referência de onde tocar. Ver TOKENS.md §7.
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: scheme.surfaceContainerLow,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.md,
        ),
        // outline: 3.35:1 claro / 5.13:1 escuro contra o fill.
        border: _inputBorder(scheme.outline),
        enabledBorder: _inputBorder(scheme.outline),
        // primary: 6.03:1 claro / 5.97:1 escuro.
        focusedBorder: _inputBorder(scheme.primary, width: 2),
        errorBorder: _inputBorder(scheme.error),
        focusedErrorBorder: _inputBorder(scheme.error, width: 2),
        disabledBorder: _inputBorder(scheme.onSurface.withValues(alpha: 0.38)),
        // Rótulo e texto de apoio são TEXTO: precisam de 4.5:1, não de 3:1.
        // Por isso onSurfaceVariant, e não o cinza claro de ícone.
        labelStyle: TextStyle(color: scheme.onSurfaceVariant),
        helperStyle: TextStyle(color: scheme.onSurfaceVariant),
        prefixIconColor: scheme.onSurfaceVariant,
        suffixIconColor: scheme.onSurfaceVariant,
      ),

      checkboxTheme: CheckboxThemeData(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.xs),
        ),
      ),

      snackBarTheme: SnackBarThemeData(
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.sm),
        ),
      ),

      dividerTheme: DividerThemeData(
        color: scheme.outlineVariant,
        space: 1,
        thickness: 1,
      ),

      listTileTheme: const ListTileThemeData(
        minVerticalPadding: AppSpacing.sm,
      ),
    );
  }

  /// Indicador de base do campo filled. Só os cantos de cima são arredondados —
  /// a base é reta porque é onde vive o indicador.
  static UnderlineInputBorder _inputBorder(Color color, {double width = 1}) {
    return UnderlineInputBorder(
      borderRadius: const BorderRadius.only(
        topLeft: Radius.circular(AppRadius.sm),
        topRight: Radius.circular(AppRadius.sm),
      ),
      borderSide: BorderSide(color: color, width: width),
    );
  }
}
`;
}

export function generateMainDartCode(
  config: ScreenConfig,
  themeMode: ThemeMode,
  _palette: PaletteOption
): string {
  return `import 'package:flutter/material.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  ThemeMode _themeMode = ThemeMode.${themeMode};

  void toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${config.appBarTitle}',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: _themeMode,
      home: HomeScreen(onToggleTheme: toggleTheme),
    );
  }
}

// ==========================================
// TELA ATIVA: ${config.title.toUpperCase()}
// ==========================================

class HomeScreen extends StatefulWidget {
  final VoidCallback onToggleTheme;

  const HomeScreen({super.key, required this.onToggleTheme});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      ${config.showAppBar ? `appBar: AppBar(
        title: Text('${config.appBarTitle}'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
            onPressed: widget.onToggleTheme,
            tooltip: 'Alternar Tema',
          ),
        ],
      ),` : ''}
      ${config.showDrawer ? `drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            UserAccountsDrawerHeader(
              accountName: const Text('Usuário Flutter'),
              accountEmail: const Text('usuario@exemplo.com'),
              currentAccountPicture: const CircleAvatar(
                backgroundColor: Colors.white,
                child: Icon(Icons.person, color: Theme.of(context).colorScheme.primary, size: 36),
              ),
              decoration: const BoxDecoration(
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Início'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.person),
              title: const Text('Perfil'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Configurações'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),` : ''}
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              ${getScreenContentBody(config.id)}
            ],
          ),
        ),
      ),
      ${config.showFAB ? `floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Ação primária executada!')),
          );
        },
        backgroundColor: Theme.of(context).colorScheme.secondary,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('Novo Item', style: TextStyle(color: Colors.white)),
      ),` : ''}
      ${config.showBottomNav ? `bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home, color: Theme.of(context).colorScheme.primary),
            label: 'Início',
          ),
          NavigationDestination(
            icon: Icon(Icons.bar_chart_outlined),
            selectedIcon: Icon(Icons.bar_chart, color: Theme.of(context).colorScheme.primary),
            label: 'Métricas',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person, color: Theme.of(context).colorScheme.primary),
            label: 'Perfil',
          ),
        ],
      ),` : ''}
    );
  }
}
\${getExtraWidgets(config.id)}
`;
}

function getScreenContentBody(screenId: string): string {
  switch (screenId) {
    case 'cadastro':
      return `
              // E1-01 Cadastro Autônomo
              const _CadastroView(),
`;
    default:
      return `
              Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.architecture,
                      size: 64,
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Protótipo Vazio',
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Pronto para receber o novo código Flutter.',
                      style: TextStyle(color: Colors.grey),
                    ),
                  ],
                ),
              )
`;
  }
}

function getExtraWidgets(screenId: string): string {
  if (screenId === 'cadastro') {
    return `
// ==========================================
// WIDGETS PRIVADOS
// ==========================================

enum CadastroState { preenchendo, enviando, erroValidacao, menorDeIdade, emailExistente, erroRede, sucesso }

class _CadastroView extends StatefulWidget {
  const _CadastroView();

  @override
  State<_CadastroView> createState() => _CadastroViewState();
}

class _CadastroViewState extends State<_CadastroView> {
  CadastroState _currentState = CadastroState.preenchendo;
  bool _termosAceitos = false;
  
  final _nomeController = TextEditingController();
  final _emailController = TextEditingController();
  final _senhaController = TextEditingController();
  final _dataNascController = TextEditingController();

  @override
  void dispose() {
    _nomeController.dispose();
    _emailController.dispose();
    _senhaController.dispose();
    _dataNascController.dispose();
    super.dispose();
  }

  void _tentarCadastrar() {
    setState(() => _currentState = CadastroState.enviando);
    
    // Simulação de regras (RN-02, RN-06, Erro genérico)
    Future.delayed(const Duration(seconds: 2), () {
      if (!mounted) return;
      
      final email = _emailController.text.trim().toLowerCase();
      final data = _dataNascController.text;

      if (data == '2010-01-01' || data.contains('2010')) {
        setState(() => _currentState = CadastroState.menorDeIdade);
      } else if (email.contains('existente')) {
        setState(() => _currentState = CadastroState.emailExistente);
      } else if (email.contains('erro')) {
        setState(() => _currentState = CadastroState.erroRede);
      } else {
        setState(() => _currentState = CadastroState.sucesso);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_currentState == CadastroState.sucesso) {
      return _buildSucesso();
    }

    final bloqueado = _currentState == CadastroState.enviando || _currentState == CadastroState.sucesso;

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 480),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Criar conta de atleta',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
            ),
            const SizedBox(height: 32),
            
            TextField(
              controller: _nomeController,
              enabled: !bloqueado,
              decoration: const InputDecoration(
                labelText: 'Nome Completo *',
                hintText: 'Ex: Gustavo Silva',
                prefixIcon: Icon(Icons.person_outline),
              ),
            ),
            const SizedBox(height: 16),
            
            TextField(
              controller: _emailController,
              enabled: !bloqueado,
              decoration: InputDecoration(
                labelText: 'E-mail de Acesso *',
                hintText: 'gustavo.silva@exemplo.com',
                prefixIcon: const Icon(Icons.email_outlined),
                errorText: _currentState == CadastroState.emailExistente 
                  ? 'Este e-mail já está em uso na plataforma. Faça login ou recupere a senha.' 
                  : null,
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 16),
            
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: TextField(
                    controller: _dataNascController,
                    enabled: !bloqueado,
                    decoration: InputDecoration(
                      labelText: 'Nascimento *',
                      hintText: 'AAAA-MM-DD',
                      errorText: _currentState == CadastroState.menorDeIdade
                        ? 'O cadastro autônomo é restrito a maiores de 18 anos.'
                        : null,
                      errorMaxLines: 2,
                    ),
                    keyboardType: TextInputType.datetime,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: TextField(
                    controller: _senhaController,
                    enabled: !bloqueado,
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: 'Senha (mín 8) *',
                      hintText: '••••••••',
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 48,
                  width: 48,
                  child: Checkbox(
                    value: _termosAceitos,
                    onChanged: bloqueado ? null : (v) => setState(() => _termosAceitos = v ?? false),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 14),
                    child: Text(
                      'Li e concordo com os Termos de Uso e Política de Privacidade.',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),

            if (_currentState == CadastroState.erroRede) ...[
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.errorContainer,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Icon(Icons.error_outline, color: Theme.of(context).colorScheme.onErrorContainer),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Não foi possível conectar. Verifique sua internet e tente de novo.',
                        style: TextStyle(color: Theme.of(context).colorScheme.onErrorContainer),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
            ],

            FilledButton(
              onPressed: (_termosAceitos && !bloqueado) ? _tentarCadastrar : null,
              style: FilledButton.styleFrom(
                minimumSize: const Size.fromHeight(48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: _currentState == CadastroState.enviando
                  ? const SizedBox(
                      width: 24,
                      height: 24,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                    )
                  : const Text('Criar conta'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSucesso() {
    final nomeDigitado = _nomeController.text.trim();
    final slug = nomeDigitado.isEmpty ? 'atleta' : nomeDigitado.toLowerCase().replaceAll(' ', '.');
    final handleGerado = '@$slug.123';

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 480),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.check_circle_outline,
              size: 64,
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(height: 24),
            Text(
              'Conta criada com sucesso!',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
            ),
            const SizedBox(height: 16),
            Text(
              'O seu identificador único gerado pelo sistema é:',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                handleGerado,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.2,
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Enviamos um e-mail de verificação para \${_emailController.text}. '
              'Você já pode acessar a plataforma.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            FilledButton(
              onPressed: () {
                // Aqui navegaria para Home/Dashboard real
              },
              style: FilledButton.styleFrom(
                minimumSize: const Size.fromHeight(48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: const Text('Entrar na Plataforma'),
            ),
          ],
        ),
      ),
    );
  }
}
`;
  }
  return '';
}

export function generatePubspecYaml(config: ScreenConfig): string {
  return `name: flutter_ui_studio_app
description: "Aplicativo Flutter prototipado no Google AI Studio (Material 3, Android, iOS, Web)."
publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  google_fonts: ^6.2.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`;
}

export function generateGithubWorkflow(): string {
  return `name: Build & Test Flutter App

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Java JDK
        uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Set up Flutter SDK
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.x'
          channel: 'stable'
          cache: true

      - name: Install Dependencies
        run: flutter pub get

      - name: Run Linter
        run: flutter analyze

      - name: Build Web Application
        run: flutter build web --release

      - name: Build Android APK
        run: flutter build apk --split-per-abi
`;
}
