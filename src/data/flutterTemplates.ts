import { DevicePlatform, PaletteOption, ScreenConfig, ThemeMode } from '../types';

export const COLOR_PALETTES: PaletteOption[] = [
  {
    id: 'ametista',
    // Paleta oficial desde 09/09/2026. Fica em primeiro: é a que o simulador abre.
    // As demais continuam na lista só para comparação visual.
    name: 'Ametista (oficial)',
    primary: '#5B21B6',
    primaryDark: '#BFA3F5',
    secondary: '#7C3AED',
    accentGreen: '#C4A5FF',
    neutralGray: '#271643',
    surfaceLight: '#F2EDF9',
    surfaceDark: '#271643',
    backgroundLight: '#FCFAFD',
    backgroundDark: '#170D2B',
    outlineLight: '#79718C',
    outlineDark: '#978BB2',
  },
  {
    id: 'luna',
    name: 'Luna Ocean (anterior)',
    // primary/secondary definidos por contraste medido, não por gosto:
    // #26658C com texto branco = 6.32:1 (aprova WCAG AA)
    // #54ACBF com texto branco = 2.62:1 (reprova) — por isso só no escuro.
    // Não inverter de volta.
    primary: '#26658C',
    primaryDark: '#54ACBF',
    secondary: '#54ACBF',
    accentGreen: '#A7EBF2',
    neutralGray: '#023859',
    surfaceLight: '#F7FAFC',
    surfaceDark: '#023859',
    backgroundLight: '#FCFDFE',
    backgroundDark: '#011C40',
    outlineLight: '#7A8B99',
    outlineDark: '#7E97AB',
  },
  {
    id: 'grafite',
    name: 'Grafite & verde água',
    primary: '#2B3E3A',
    primaryDark: '#5FD6BC',
    secondary: '#5FD6BC',
    accentGreen: '#5FD6BC',
    neutralGray: '#182725',
    surfaceLight: '#EFF4F3',
    surfaceDark: '#182725',
    backgroundLight: '#FAFCFC',
    backgroundDark: '#0E1918',
    outlineLight: '#6B7B79',
    outlineDark: '#879997',
  },
  {
    id: 'deep-teal',
    name: 'Deep Teal (petróleo)',
    primary: '#206662',
    primaryDark: '#2A7B76',
    secondary: '#2A7B76',
    accentGreen: '#139B75',
    neutralGray: '#104046',
    surfaceLight: '#E4EFEF',
    surfaceDark: '#104046',
    backgroundLight: '#F4F8F8',
    backgroundDark: '#021F25',
    // corrigidos: os valores originais do estudo davam 1.21:1 e 1.56:1,
    // abaixo do mínimo de 3:1 para limite de controle.
    outlineLight: '#7E9192',
    outlineDark: '#557C80',
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

/// Paleta Ametista — os valores brutos. Oficial desde 09/09/2026.
///
/// ATENÇÃO: fora deste arquivo, NÃO use estas constantes. Use
/// \`Theme.of(context).colorScheme.<papel>\`. As constantes existem apenas para
/// alimentar o ColorScheme abaixo.
abstract final class Ametista {
  /// Roxo de ação. Contraste com branco = 8.98:1 → APROVA WCAG AA.
  /// É a cor de ação primária no tema claro e a cor da faixa de marca.
  /// Contra o fundo escuro cai para 2.07:1 — não serve de ação no escuro.
  static const Color acao = Color(0xFF5B21B6);

  /// Lavanda. Contraste com branco = 2.15:1 → REPROVA WCAG AA.
  /// Nunca usar como fundo de texto branco. É a ação primária do tema escuro
  /// (8.66:1 contra o fundo) e serve como \`secondary\` no tema claro.
  static const Color lavanda = Color(0xFFBFA3F5);

  /// Lavanda clara. \`secondary\` do tema escuro (12.82:1 contra o fundo) e
  /// subtítulo da faixa de marca (6.19:1 sobre o roxo de ação).
  static const Color lavandaClara = Color(0xFFDED0F7);

  /// Cartão. Fill de campo e superfície de cartão no tema escuro.
  static const Color cartao = Color(0xFF271643);

  /// Fundo. Contraste com branco = 18.60:1.
  /// Fundo do tema escuro e cor de texto de maior ênfase no tema claro.
  static const Color fundo = Color(0xFF170D2B);
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

/// Cores semânticas do domínio esportivo.
///
/// O \`ColorScheme\` do M3 cobre marca, superfície e erro — não cobre "treino
/// concluído" nem "aderência alta". Estas entram como extensão de tema, e não
/// como constante solta na tela: assim continuam trocando junto com claro/escuro.
///
/// Consumo: \`Theme.of(context).extension<AppSemanticColors>()!.sucesso\`
///
/// Regra de leitura: são apenas TRÊS níveis reaproveitados em todo o produto —
/// \`sucesso\`, \`aviso\` e o \`error\` do próprio ColorScheme. Não invente um quarto
/// tom para cada domínio novo; mapeie no que já existe.
///
/// | Domínio | sucesso | aviso | error | neutro |
/// |---|---|---|---|---|
/// | Status de treino | concluído | parcial | não realizado | prescrito |
/// | Aderência | alta | média | baixa | sem dados |
/// | Financeiro | em dia | a vencer | inadimplente | sem cobrança |
/// | Handle no cadastro | disponível | verificando | indisponível | vazio |
///
/// ACESSIBILIDADE: cor nunca é o único sinal. Verde e vermelho são justamente
/// o par que o daltonismo mais comum confunde — todo estado precisa de ícone ou
/// texto junto.
@immutable
class AppSemanticColors extends ThemeExtension<AppSemanticColors> {
  const AppSemanticColors({
    required this.sucesso,
    required this.onSucesso,
    required this.sucessoContainer,
    required this.onSucessoContainer,
    required this.aviso,
    required this.onAviso,
    required this.avisoContainer,
    required this.onAvisoContainer,
    required this.neutro,
  });

  /// Cor de texto e ícone. Já verificada contra a \`surface\` do tema.
  final Color sucesso;
  final Color onSucesso;

  /// Fundo de chip, banner e badge.
  final Color sucessoContainer;
  final Color onSucessoContainer;

  final Color aviso;
  final Color onAviso;
  final Color avisoContainer;
  final Color onAvisoContainer;

  /// Estado sem informação — prescrito ainda não executado, sem dados de
  /// aderência, campo ainda não preenchido. Espelha \`onSurfaceVariant\`.
  final Color neutro;

  /// Claro: sucesso 5.15:1 e aviso 5.71:1 contra a surface; os pares
  /// container/on-container ficam em 8.72:1 e 9.12:1.
  static const light = AppSemanticColors(
    sucesso: Color(0xFF1B7A4B),
    onSucesso: Colors.white,
    sucessoContainer: Color(0xFFD7F2E3),
    onSucessoContainer: Color(0xFF0B4A2C),
    aviso: Color(0xFF8A5A00),
    onAviso: Colors.white,
    avisoContainer: Color(0xFFFDF0D5),
    onAvisoContainer: Color(0xFF5A3A00),
    neutro: Color(0xFF5C5470),
  );

  /// Escuro: sucesso 10.53:1 e aviso 11.00:1 contra o fundo; os pares
  /// container/on-container ficam em 8.23:1 e 8.51:1.
  static const dark = AppSemanticColors(
    sucesso: Color(0xFF6FD79E),
    onSucesso: Color(0xFF00281A),
    sucessoContainer: Color(0xFF10422A),
    onSucessoContainer: Color(0xFFA7E9C4),
    aviso: Color(0xFFF0C060),
    onAviso: Color(0xFF2E1F00),
    avisoContainer: Color(0xFF4A3400),
    onAvisoContainer: Color(0xFFF5D89A),
    neutro: Color(0xFFB5AACB),
  );

  @override
  AppSemanticColors copyWith({
    Color? sucesso,
    Color? onSucesso,
    Color? sucessoContainer,
    Color? onSucessoContainer,
    Color? aviso,
    Color? onAviso,
    Color? avisoContainer,
    Color? onAvisoContainer,
    Color? neutro,
  }) {
    return AppSemanticColors(
      sucesso: sucesso ?? this.sucesso,
      onSucesso: onSucesso ?? this.onSucesso,
      sucessoContainer: sucessoContainer ?? this.sucessoContainer,
      onSucessoContainer: onSucessoContainer ?? this.onSucessoContainer,
      aviso: aviso ?? this.aviso,
      onAviso: onAviso ?? this.onAviso,
      avisoContainer: avisoContainer ?? this.avisoContainer,
      onAvisoContainer: onAvisoContainer ?? this.onAvisoContainer,
      neutro: neutro ?? this.neutro,
    );
  }

  @override
  AppSemanticColors lerp(ThemeExtension<AppSemanticColors>? other, double t) {
    if (other is! AppSemanticColors) return this;
    return AppSemanticColors(
      sucesso: Color.lerp(sucesso, other.sucesso, t)!,
      onSucesso: Color.lerp(onSucesso, other.onSucesso, t)!,
      sucessoContainer: Color.lerp(sucessoContainer, other.sucessoContainer, t)!,
      onSucessoContainer:
          Color.lerp(onSucessoContainer, other.onSucessoContainer, t)!,
      aviso: Color.lerp(aviso, other.aviso, t)!,
      onAviso: Color.lerp(onAviso, other.onAviso, t)!,
      avisoContainer: Color.lerp(avisoContainer, other.avisoContainer, t)!,
      onAvisoContainer: Color.lerp(onAvisoContainer, other.onAvisoContainer, t)!,
      neutro: Color.lerp(neutro, other.neutro, t)!,
    );
  }
}

/// Atalho de leitura: \`context.semantic.sucesso\`.
extension AppSemanticColorsX on BuildContext {
  AppSemanticColors get semantic =>
      Theme.of(this).extension<AppSemanticColors>()!;
}

/// Cores da faixa de marca — o topo das telas de entrada (cadastro, ativação,
/// login), onde a cor da marca ocupa a tela.
///
/// Diferente de \`colorScheme.primary\`, que é cor de AÇÃO e muda com o tema (no
/// escuro vira lavanda), a faixa de marca é FIXA nos dois temas: roxo com título
/// branco e subtítulo lavanda clara. É o que o estudo "Quatro identidades" define
/// (\`--m-brand\` e \`--m-onbrand-soft\`, iguais em claro e escuro).
///
/// Contrastes sobre a faixa: onFaixa 8.98:1 e onFaixaSuave 6.19:1.
///
/// Consumo: \`context.brand.faixa\`.
@immutable
class AppBrandColors extends ThemeExtension<AppBrandColors> {
  const AppBrandColors({
    required this.faixa,
    required this.onFaixa,
    required this.onFaixaSuave,
  });

  /// Fundo da faixa de marca.
  final Color faixa;

  /// Título, logo e ícones sobre a faixa.
  final Color onFaixa;

  /// Texto secundário sobre a faixa (subtítulo).
  final Color onFaixaSuave;

  static const light = AppBrandColors(
    faixa: Ametista.acao,
    onFaixa: Colors.white,
    onFaixaSuave: Ametista.lavandaClara,
  );

  /// Igual ao claro de propósito: a faixa de marca não muda com o tema.
  static const dark = AppBrandColors(
    faixa: Ametista.acao,
    onFaixa: Colors.white,
    onFaixaSuave: Ametista.lavandaClara,
  );

  @override
  AppBrandColors copyWith({Color? faixa, Color? onFaixa, Color? onFaixaSuave}) {
    return AppBrandColors(
      faixa: faixa ?? this.faixa,
      onFaixa: onFaixa ?? this.onFaixa,
      onFaixaSuave: onFaixaSuave ?? this.onFaixaSuave,
    );
  }

  @override
  AppBrandColors lerp(ThemeExtension<AppBrandColors>? other, double t) {
    if (other is! AppBrandColors) return this;
    return AppBrandColors(
      faixa: Color.lerp(faixa, other.faixa, t)!,
      onFaixa: Color.lerp(onFaixa, other.onFaixa, t)!,
      onFaixaSuave: Color.lerp(onFaixaSuave, other.onFaixaSuave, t)!,
    );
  }
}

/// Atalho de leitura: \`context.brand.faixa\`.
extension AppBrandColorsX on BuildContext {
  AppBrandColors get brand => Theme.of(this).extension<AppBrandColors>()!;
}

abstract final class AppTheme {
  // ---------------------------------------------------------------------------
  // TEMA CLARO
  // ---------------------------------------------------------------------------
  static ThemeData get light =>
      _build(_lightScheme, AppSemanticColors.light, AppBrandColors.light);

  // Os degraus surfaceContainer, High e Highest não existem no estudo da
  // Ametista: foram derivados com os mesmos passos de luminosidade da escada
  // anterior (Luna Ocean), no matiz da Ametista. Ver TOKENS.md §1.
  static final ColorScheme _lightScheme = ColorScheme.fromSeed(
    seedColor: Ametista.acao,
    brightness: Brightness.light,
    // Papéis fixados à mão — o fromSeed sozinho não respeita a paleta da marca.
    primary: Ametista.acao,
    onPrimary: Colors.white,
    secondary: Ametista.lavanda,
    // Texto sobre lavanda precisa ser escuro: branco sobre lavanda é 2.15:1.
    onSecondary: Ametista.fundo,
    surface: const Color(0xFFFCFAFD),
    onSurface: Ametista.fundo,
    // 6.17:1 sobre o fill do campo — rótulo e helper são texto, pedem 4.5:1.
    onSurfaceVariant: const Color(0xFF5C5470),
    surfaceContainerLowest: Colors.white,
    surfaceContainerLow: const Color(0xFFF2EDF9),
    surfaceContainer: const Color(0xFFEDE6F7),
    surfaceContainerHigh: const Color(0xFFE6DCF3),
    surfaceContainerHighest: const Color(0xFFDED2F0),
    outline: const Color(0xFF79718C),
    outlineVariant: const Color(0xFFE4DCEF),
  );

  // ---------------------------------------------------------------------------
  // TEMA ESCURO
  // ---------------------------------------------------------------------------
  // O atleta abre o app de madrugada e ao sol. O modo escuro não é enfeite —
  // é o modo em que metade dos usuários vai viver. Ele NÃO pode sumir.
  static ThemeData get dark =>
      _build(_darkScheme, AppSemanticColors.dark, AppBrandColors.dark);

  // Degraus derivados como no claro: surfaceContainerLowest (a partir do fundo)
  // e surfaceContainer, High e Highest (a partir do cartão).
  static final ColorScheme _darkScheme = ColorScheme.fromSeed(
    seedColor: Ametista.acao,
    brightness: Brightness.dark,
    // No escuro os papéis invertem: a lavanda é quem tem contraste (8.66:1
    // contra o fundo), então ela vira a ação primária.
    primary: Ametista.lavanda,
    onPrimary: Ametista.fundo,
    secondary: Ametista.lavandaClara,
    onSecondary: Ametista.fundo,
    surface: Ametista.fundo,
    onSurface: const Color(0xFFEDE8F5),
    // 7.47:1 sobre o fill do campo no escuro.
    onSurfaceVariant: const Color(0xFFB5AACB),
    surfaceContainerLowest: const Color(0xFF0F091C),
    surfaceContainerLow: Ametista.cartao,
    surfaceContainer: const Color(0xFF2D194E),
    surfaceContainerHigh: const Color(0xFF381F60),
    surfaceContainerHighest: const Color(0xFF432673),
    outline: const Color(0xFF978BB2),
    outlineVariant: const Color(0xFF33204F),
  );

  // ---------------------------------------------------------------------------
  // CONSTRUÇÃO COMPARTILHADA
  // ---------------------------------------------------------------------------
  // Claro e escuro compartilham TODA a estrutura. A única diferença permitida
  // entre eles é o ColorScheme. Foi divergir daqui que produziu dois temas
  // incompatíveis nos primeiros protótipos.
  static ThemeData _build(
    ColorScheme scheme,
    AppSemanticColors semantic,
    AppBrandColors brand,
  ) {
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      extensions: [semantic, brand],
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
      // O indicador inativo NUNCA é BorderSide.none. O fill sozinho dá 1.11:1
      // contra a surface: como demarcação ele é invisível, e o usuário perde a
      // referência de onde tocar. Ver TOKENS.md §7.
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: scheme.surfaceContainerLow,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.md,
        ),
        // outline: 4.01:1 claro / 5.19:1 escuro contra o fill.
        border: _inputBorder(scheme.outline),
        enabledBorder: _inputBorder(scheme.outline),
        // primary: 7.81:1 claro / 7.62:1 escuro.
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
${getExtraWidgets(config.id)}
`;
}

function getScreenContentBody(screenId: string): string {
  switch (screenId) {
    case 'padroes':
      return `
              // Vitrine do Design System. O código das telas vive no projeto run_forest_run_app.
              // Esta tela serve apenas de referência estrutural no preview React.
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
  if (screenId === 'padroes') {
    return '';
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
