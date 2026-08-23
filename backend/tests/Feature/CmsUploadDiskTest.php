<?php

namespace Tests\Feature;

use Tests\TestCase;

/**
 * Filament resolves an upload's disk from config('filament.default_filesystem_disk'),
 * which falls back to FILESYSTEM_DISK and therefore to the private 'local' disk.
 * Anything uploaded there is never reachable under /storage, so publicly rendered
 * uploads must pin the public disk explicitly rather than depend on the environment.
 */
class CmsUploadDiskTest extends TestCase
{
    /**
     * @return array<string, array{string}>
     */
    public static function filamentFiles(): array
    {
        $base = dirname(__DIR__, 2) . '/app/Filament';
        $files = [];

        $iterator = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($base));
        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                $files[$file->getBasename()] = [$file->getPathname()];
            }
        }

        return $files;
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('filamentFiles')]
    public function test_every_file_upload_pins_the_public_disk(string $path): void
    {
        $source = file_get_contents($path);

        $uploadCount = substr_count($source, 'FileUpload::make(');

        if ($uploadCount === 0) {
            $this->addToAssertionCount(1);

            return;
        }

        $this->assertSame(
            $uploadCount,
            substr_count($source, "->disk('public')"),
            basename($path) . ' has a FileUpload that does not pin ->disk(\'public\').'
        );

        $this->assertSame(
            $uploadCount,
            substr_count($source, "->visibility('public')"),
            basename($path) . ' has a FileUpload that does not pin ->visibility(\'public\').'
        );
    }

    public function test_all_four_known_cms_uploads_are_covered(): void
    {
        $base = dirname(__DIR__, 2) . '/app/Filament';
        $total = 0;

        $iterator = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($base));
        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                $total += substr_count(file_get_contents($file->getPathname()), 'FileUpload::make(');
            }
        }

        // blog image, gallery image, category image, product images.
        $this->assertSame(4, $total, 'A FileUpload was added or removed; confirm its disk is public.');
    }
}
