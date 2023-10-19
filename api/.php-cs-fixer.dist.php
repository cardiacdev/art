<?php

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->exclude(['var'])
;

return (new PhpCsFixer\Config())
    ->setRules([
        '@Symfony' => true,
        '@Symfony:risky' => true,
        'combine_consecutive_issets' => true,
        'combine_consecutive_unsets' => true,
        'declare_strict_types' => true,
        'global_namespace_import' => [
            'import_classes' => true,
            'import_constants' => true,
            'import_functions' => true,
        ],
        'ordered_imports' => [
            'imports_order' => ['class', 'const', 'function'],
        ],
        'phpdoc_order' => true,
        // Erlaubt Psalm-Suppress Annotations etc.
        'phpdoc_to_comment' => false,
    ])
    ->setRiskyAllowed(true)
    ->setFinder($finder)
;